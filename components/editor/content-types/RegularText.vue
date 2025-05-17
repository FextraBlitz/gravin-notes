<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
const props = defineProps({
  text: String,
  id: [String, Number], // key to identify
  selected: Boolean,
  render: Boolean
})
const refInput = ref(null)
defineExpose({ refInput })
const emit = defineEmits(['select', 'update', 'delete', 'register-methods', 'expose-methods'])
// --OPTIMIZED UNDO REDO LOGIC--
const internalText = ref(props.text || '')
// Fixed text synchronization
watch(() => props.text, (newVal) => {
  // Only update if different from current state and not undefined/null
  if (newVal !== undefined && newVal !== internalText.value) {
    internalText.value = newVal || ''
  }
}, { immediate: true })
// --SELECT LOGIC--
const onClick = () => {
  emit('select', props.id) // notify parent with ID/key
}
// --RENDER LOGIC--
const realtimeRender = ref(false)
const renderMarkdown = computed(() => props.render !== false)
const renderedOutput = computed(() => {
  const dirty = renderMarkdown.value ? marked(internalText.value || '') : internalText.value
  return DOMPurify.sanitize(dirty)
})
</script>
<template>
    <div
        @click="onClick"
        :class="[
          'notebook-paper w-full max-w-full px-6 py-3 my-1 whitespace-pre-wrap break-words overflow-y-auto text-balance',
          props.selected ? 'notebook-selected' : 'hover:shadow-md transition-shadow cursor-pointer'
        ]"
    >
      <div
        v-if="internalText && internalText.trim() !== ''"
        v-html="renderedOutput"
        class="markdown-body prose-override prose whitespace-normal text-gray-800 text-balance relative z-10"
      />
     
      <div v-else class="italic text-gray-400 relative z-10">
        Start writing...
      </div>
    </div>
</template>
<style scoped>
.notebook-paper {
  position: relative;
  background-color: #f9f9f9;
  background-image:
    linear-gradient(#e8e8e8 1px, transparent 1px);
  background-size: 100% 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  border-radius: 3px;
  border-left: 1px solid #e0e0e0;
}
/* Red margin line on the left */
.notebook-paper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 30px;
  height: 100%;
  width: 1px;
  background: rgba(255,0,0,0.1);
  z-index: 1;
}
/* Top margin line */
.notebook-paper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(180deg, rgba(220,220,220,0.5) 0%, rgba(255,255,255,0) 100%);
}
.notebook-selected {
  box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
  background-color: #f5f5f5;
  cursor: default;
  outline: 2px solid #bd93f9; /* Dracula Alucard purple outline for selected state */
  outline-offset: 2px;
}

/* Fix the prose width constraint */
.prose-override {
  max-width: 100% !important;
  width: 100% !important;
}

:deep(.prose) {
  max-width: 100% !important;
  width: 100% !important;
}

/* Darker HR */
:deep(.markdown-body hr) {
  border-color: rgba(0, 0, 0, 0.25);
}

/* Ensure markdown content has proper styling */
:deep(.markdown-body h1) {
  color: #404040;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Georgia', serif;
}
:deep(.markdown-body h2, .markdown-body h3, .markdown-body h4) {
  color: #505050;
  font-family: 'Georgia', serif;
}
:deep(.markdown-body a) {
  color: #505050;
  text-decoration: underline;
}
:deep(.markdown-body code) {
  background: #f5f5f5;
  color: #505050;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}
:deep(.markdown-body pre) {
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
}
.transition-shadow {
  transition: box-shadow 0.2s ease;
}
/* Make text look handwritten for placeholder */
.italic {
  font-family: 'Georgia', serif;
}
</style>