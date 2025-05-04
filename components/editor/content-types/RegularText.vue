<script setup>
import { ref, computed, watch, nextTick, expose} from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  text: String,
  id: [String, Number], // key to identify
  selected: Boolean,
  render: Boolean
})

const emit = defineEmits(['select', 'update', 'delete'])


// --UNDO REDO LOGIC--

const internalText = ref(props.text || '')
const undoStack = ref([])
const redoStack = ref([])

// Sync when props.text changes externally
watch(() => props.text, (newVal) => {
  internalText.value = newVal
})

// Save previous value before change
watch(internalText, (newVal, oldVal) => {
  if (props.selected) {
    undoStack.value.push(oldVal)
    redoStack.value = []
    emit('update', newVal)
  }
})

const undo = () => {
  if (!undoStack.value.length) return
  redoStack.value.push(internalText.value)
  internalText.value = undoStack.value.pop()
  emit('update', internalText.value)
}

const redo = () => {
  if (!redoStack.value.length) return
  undoStack.value.push(internalText.value)
  internalText.value = redoStack.value.pop()
  emit('update', internalText.value)
}

// Allow parent to call undo/redo
expose({ undo, redo })

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
        v-if="props.text && props.text.trim() !== ''"
        v-html="renderedOutput"
        />
      
      <div v-else class="italic text-gray-500">
        Start writing...
      </div>
    </div>
</template>

<style scoped>
</style>