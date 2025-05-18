```vue
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
let websocket = null;

const isValid = computed(() => !!selectedFile.value);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size exceeds 10MB. Please select a smaller PDF.');
      fileInput.value.value = '';
      selectedFile.value = null;
    } else {
      selectedFile.value = file;
    }
  } else {
    selectedFile.value = null;
    fileInput.value.value = '';
    alert('Please select a valid PDF file.');
  }
};

const setupWebSocket = () => {
  websocket = new WebSocket('wss://api.x.ai/grok');

  websocket.onopen = () => {
    console.log('WebSocket connected');
  };

  websocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'message' && data.content) {
        emit('submit', { summary: data.content });
      } else {
        console.warn('Unexpected WebSocket message:', data);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
      alert('Failed to process AI response.');
      emit('update:isOpen', false);
    }
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
    alert('Failed to connect to AI service.');
    emit('update:isOpen', false);
  };

  websocket.onclose = () => {
    console.log('WebSocket closed');
    websocket = null;
  };
};

const handleSubmit = () => {
  if (isValid.value) {
    setupWebSocket();
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1]; // Remove data URL prefix
      const message = {
        type: 'message',
        content: {
          file: base64Data,
          filename: selectedFile.value.name,
          prompt: promptText.value.trim() || 'Summarize the PDF in 200 words.'
        }
      };
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(message));
      } else {
        console.error('WebSocket not ready');
        alert('Failed to connect to AI service.');
        closeDialog();
      }
    };
    reader.onerror = () => {
      console.error('Error reading file');
      alert('Failed to read PDF file.');
      closeDialog();
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

const closeDialog = () => {
  if (websocket) {
    websocket.close();
  }
  selectedFile.value = null;
  promptText.value = '';
  if (fileInput.value) fileInput.value.value = '';
  emit('update:isOpen', false);
};

// Close on overlay click
const handleOverlayClick = (event) => {
  if (event.target.classList.contains('dialog-overlay')) {
    closeDialog();
  }
};

// Close on Escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen && !props.isSummarizing) {
    closeDialog();
  }
};

// Auto-focus textarea when dialog opens
watch(() => props.isOpen, (newVal) => {
  console.log('AISummarizerDialog isOpen:', newVal);
  if (newVal) {
    nextTick(() => {
      promptTextarea.value?.focus();
    });
  } else {
    closeDialog();
  }
});

// Add Escape key listener
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  if (websocket) {
    websocket.close();
  }
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
          v-if="!isSummarizing"
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
      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-2 sm:gap-4 flex-1">
        <!-- Prompt Textarea -->
        <div class="flex flex-col gap-2 flex-1">
          <label for="prompt" class="text-sm sm:text-xl font-medium text-gray-700 text-center">
            Summarization Prompt (Optional)
          </label>
          <textarea
            id="prompt"
            ref="promptTextarea"
            v-model="promptText"
            :disabled="isSummarizing"
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
              :disabled="isSummarizing"
              @change="handleFileChange"
              class="flex-1 text-sm sm:text-base text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm sm:file:text-base file:font-semibold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100 disabled:file:bg-gray-200 disabled:file:text-gray-400"
              aria-required="true"
            />
          </div>
          <button
            v-if="!isSummarizing"
            type="button"
            @click="closeDialog"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-lg w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!isValid || isSummarizing"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-lg w-full sm:w-auto justify-center"
            :aria-disabled="!isValid || isSummarizing"
          >
            <div v-if="isSummarizing" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-white border-gray-200"></div>
            <img
              v-else
              src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/upload.svg"
              alt="Upload icon"
              class="h-4 w-4"
            >
            {{ isSummarizing ? 'Summarizing...' : 'Summarize' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Icon filters */
img[src*="lucide-static"] {
  filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

button:hover img[src*="lucide-static"] {
  filter: invert(40%) sepia(57%) saturate(5135%) hue-rotate(247deg) brightness(98%) contrast(96%);
}

.bg-purple-600 img[src*="lucide-static"],
.bg-purple-700 img[src*="lucide-static"] {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

/* Custom scrollbar */
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

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}
</style>
```