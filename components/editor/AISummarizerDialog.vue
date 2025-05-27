<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  isSummarizing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:isOpen', 'submit']);

const fileInput = ref(null);
const selectedFile = ref(null);
const promptText = ref('');
const promptTextarea = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

const isValid = computed(() => !!selectedFile.value);

const handleFileChange = (event) => {
  errorMessage.value = '';
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    if (file.size > 10 * 1024 * 1024) {
      errorMessage.value = 'File size exceeds 10MB. Please select a smaller PDF.';
      fileInput.value.value = '';
      selectedFile.value = null;
    } else {
      selectedFile.value = file;
    }
  } else {
    errorMessage.value = 'Please select a valid PDF file.';
    fileInput.value.value = '';
    selectedFile.value = null;
  }
};

const handleSubmit = async () => {
  if (!isValid.value) {
    errorMessage.value = 'Please select a valid PDF file.';
    return;
  }
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('prompt', promptText.value.trim() || 'Summarize the PDF in 200 words.');

    const response = await fetch('https://ccs8finalproj-production.up.railway.app/pdf/upload/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access') || ''}`
      },
      body: formData
    });

    // Log response status and headers for debugging
    console.log('API Response Status:', response.status, response.statusText);
    console.log('API Response Headers:', [...response.headers.entries()]);

    // Check if response is OK
    if (!response.ok) {
      const text = await response.text();
      console.error('Non-OK Response Body:', text);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    // Attempt to parse JSON
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      const text = await response.text();
      console.error('Raw Response Body:', text);
      throw new Error('Invalid JSON response from server. Please try again or contact support.');
    }

    if (data.summary) {
      console.log('Summary received:', data.summary);
      emit('submit', { summary: data.summary });
      closeDialog();
    } else {
      throw new Error(data.message || 'No summary provided by the server.');
    }
  } catch (error) {
    console.error('Error summarizing PDF:', error);
    errorMessage.value = error.message || 'Failed to summarize PDF. Please check your connection or try again.';
  } finally {
    isLoading.value = false;
  }
};

const closeDialog = () => {
  selectedFile.value = null;
  promptText.value = '';
  errorMessage.value = '';
  if (fileInput.value) fileInput.value.value = '';
  emit('update:isOpen', false);
};

const handleOverlayClick = (event) => {
  if (event.target.classList.contains('dialog-overlay') && !props.isSummarizing && !isLoading.value) {
    closeDialog();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen && !props.isSummarizing && !isLoading.value) {
    closeDialog();
  }
};

watch(() => props.isOpen, (newVal) => {
  console.log('AISummarizerDialog isOpen changed:', newVal);
  if (newVal) {
    nextTick(() => {
      console.log('Focusing promptTextarea');
      promptTextarea.value?.focus();
    });
  } else {
    closeDialog();
  }
});

onMounted(() => {
  console.log('AISummarizerDialog mounted');
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  console.log('AISummarizerDialog unmounted');
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="dialog-overlay fixed inset-0 bg-black/50 z-[200] flex items-center justify-center sm:p-4"
    @click="handleOverlayClick"
    role="dialog"
    aria-label="AI Summarizer"
  >
    <div
      class="bg-white w-full h-full sm:w-[90vw] sm:h-[90vh] sm:rounded-md sm:shadow-lg p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 overflow-y-auto relative"
    >
      <!-- Header -->
      <div class="flex justify-center relative">
        <h2 class="text-lg sm:text-2xl font-semibold text-gray-800">AI Summarizer</h2>
        <button
          v-if="!isSummarizing && !isLoading"
          @click="closeDialog"
          class="absolute top-0 right-0 p-2 rounded hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x.svg"
            alt="Close icon"
            class="h-6 w-6"
          >
        </button>
      </div>
      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r flex items-center gap-2"
      >
        <img
          src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/alert-circle.svg"
          alt="Error icon"
          class="h-5 w-5 text-red-500"
        >
        <span class="text-red-600 text-sm sm:text-base">{{ errorMessage }}</span>
      </div>
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex items-center justify-center p-4"
      >
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-purple-600 border-gray-200"></div>
        <span class="ml-2 text-gray-600 text-sm sm:text-base">Summarizing PDF...</span>
      </div>
      <!-- Form -->
      <form
        v-else
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-2 sm:gap-4 flex-1"
      >
        <!-- Prompt Textarea -->
        <div class="flex flex-col gap-2 flex-1">
          <label for="prompt" class="text-sm sm:text-xl font-medium text-gray-700 text-center">
            Summarization Prompt (Optional)
          </label>
          <textarea
            id="prompt"
            ref="promptTextarea"
            v-model="promptText"
            :disabled="isSummarizing || isLoading"
            placeholder="Enter summarization instructions (e.g., 'Summarize key points in 200 words')..."
            rows="6"
            class="w-full max-w-[95%] mx-auto p-2 border border-gray-200 rounded-md text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none scrollbar-thin flex-1 disabled:bg-gray-100"
            aria-label="Summarization prompt"
          ></textarea>
        </div>
        <!-- File Input and Buttons -->
        <div class="flex flex-col max-[400px]:flex-col sm:flex-row sm:items-center gap-2 justify-center">
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <label for="pdf-file" class="text-sm sm:text-xl font-medium text-gray-700">
              PDF File (Required)
            </label>
            <input
              id="pdf-file"
              ref="fileInput"
              type="file"
              accept=".pdf"
              :disabled="isSummarizing || isLoading"
              @change="handleFileChange"
              class="flex-1 text-sm sm:text-base text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm sm:file:text-base file:font-semibold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100 disabled:file:bg-gray-200 disabled:file:text-gray-400"
              aria-required="true"
            />
          </div>
          <button
            v-if="!isSummarizing && !isLoading"
            type="button"
            @click="closeDialog"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-lg w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x.svg"
              alt="Cancel icon"
              class="h-4 w-4"
            >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!isValid || isSummarizing || isLoading"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-lg w-full sm:w-auto justify-center"
            :aria-disabled="!isValid || isSummarizing || isLoading"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/upload.svg"
              alt="Upload icon"
              class="h-4 w-4"
            >
            Summarize
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
img[src*="lucide-static"] {
  filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

button:hover img[src*="lucide-static"] {
  filter: invert(40%) sepia(57%) saturate(5135%) hue-rotate(247deg) brightness(98%) contrast(96%);
}

.bg-purple-600 img[src*="lucide-static"],
.bg-purple-700 img[src*="lucide-static"],
.bg-gray-200 img[src*="lucide-static"],
.bg-gray-300 img[src*="lucide-static"] {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #BD93F9;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #A775F0;
}

*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}
</style>