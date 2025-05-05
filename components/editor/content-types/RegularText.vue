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
const render = ref(true)
const renderedOutput = computed(() => {
  const dirty = render.value ? marked(internalText.value || '') : internalText.value
  return DOMPurify.sanitize(dirty)
})
</script>

<template>
    <div
        @click="onClick"
        :class="[
          'bg-cyan-200 w-full max-w-full px-2 py-1 my-1 whitespace-pre-wrap break-words overflow-y-auto text-balance',
            props.selected ? 'cursor-default' : 'cursor-pointer'
          ]"
    >
      <div
        v-if="internalText && internalText.trim() !== ''"
        v-html="renderedOutput"
        class="markdown-body prose whitespace-normal text-black text-balance"
        />
     
      <div v-else class="italic text-gray-500">
        Start writing...
      </div>
    </div>
</template>

<style scoped>
/* .markdown-body {
  all: revert;
} */
</style>
