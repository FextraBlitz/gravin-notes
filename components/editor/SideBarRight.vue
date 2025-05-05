<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const refInput = ref(null)
defineExpose({ refInput })

const isActive = ref(true)
const localValue = ref('') // Local value to track changes

// Resize functionality
const setWidth = ref(300)
const sidebarRef = ref(null)
const cursorStyle = ref('default')
let isResizing = false
const RESIZE_MARGIN = 10

const props = defineProps({
  modelValue: String,
  id: [Number, String],
  canUndo: {
    type: Boolean,
    default: false
  },
  canRedo: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'delete', 'undo', 'redo'])

// Watch for changes in modelValue from parent
watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined && newVal !== localValue.value) {
    localValue.value = newVal || ''
  }
}, { immediate: true })

// Watch for changes in the ID and update local value when id changes
watch(() => props.id, () => {
  localValue.value = props.modelValue || ''
}, { immediate: true })

// Handle input changes and immediately propagate to parent
const handleInput = (event) => {
  if (props.id !== null && props.id !== undefined) {
    const newValue = event.target.value
    emit('update:modelValue', newValue)
  }
}

// Resize handling functions
const checkStartResize = (e) => {
  if (!sidebarRef.value) return
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  if (offsetX <= RESIZE_MARGIN) {
    e.preventDefault()
    isResizing = true
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stop)
  }
}

const checkCursor = (e) => {
  if (!sidebarRef.value) return
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  cursorStyle.value = (offsetX <= RESIZE_MARGIN)
    ? 'ew-resize'
    : 'default'
}

const resetCursor = () => {
  cursorStyle.value = 'default'
}

const resize = (e) => {
  if (isResizing) {
    // Calculate from the right side of the screen
    const windowWidth = window.innerWidth
    const newWidth = Math.min(500, Math.max(200, windowWidth - e.clientX))
    setWidth.value = newWidth
  }
}

const stop = () => {
  isResizing = false
  document.body.classList.remove('no-select')
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stop)
}

const handleBold = () => wrapSelection('**')
const handleItalic = () => wrapSelection('*')
const handleStrikethrough = () => wrapSelection('~~')
const handleInlineCode = () => wrapSelection('`')
const handleCodeBlock = () => wrapSelection('```\n', '\n```')
const handleQuote = () => wrapSelection('> ', '', true)
const handleBulletList = () => wrapSelection('- ', '', true)
const handleNumberedList = () => wrapSelection('1. ', '', true)
const handleLink = () => wrapSelection('[', '](url)')
const handleH1 = () => wrapSelection('# ', '', true)
const handleH2 = () => wrapSelection('## ', '', true)
const handleImage = () => wrapSelection('![alt](url)', '', true)
const handleHr = () => wrapSelection('\n---\n', '')

function wrapSelection(before, after = before, multiline = false) {
  const el = refInput.value
  if (!el) return

  const start = el.selectionStart
  const end = el.selectionEnd
  const fullText = localValue.value
  const selected = fullText.slice(start, end)

  // Toggle logic: remove if already wrapped
  const hasWrapper = selected.startsWith(before) && selected.endsWith(after)
  let newText, cursorStart, cursorEnd

  if (!multiline) {
    if (hasWrapper) {
      newText = fullText.slice(0, start) +
        selected.slice(before.length, selected.length - after.length) +
        fullText.slice(end)
      cursorStart = start
      cursorEnd = end - before.length - after.length
    } else {
      newText = fullText.slice(0, start) + before + selected + after + fullText.slice(end)
      cursorStart = start + before.length
      cursorEnd = end + before.length
    }
  } else {
    const lines = selected.split('\n')
    const alreadyWrapped = lines.every(line => line.startsWith(before))

    const transformed = lines.map(line =>
      alreadyWrapped ? line.slice(before.length) : before + line
    ).join('\n')

    newText = fullText.slice(0, start) + transformed + fullText.slice(end)
    cursorStart = start
    cursorEnd = start + transformed.length
  }

  localValue.value = newText
  emit('update:modelValue', localValue.value)

  nextTick(() => {
    el.focus()
    el.selectionStart = cursorStart
    el.selectionEnd = cursorEnd
  })
}
</script>

<template>
  <div 
    ref="sidebarRef"
    @mousemove="checkCursor"
    @mouseleave="resetCursor"
    @mousedown="checkStartResize"
    :style="{ width: setWidth + 'px', cursor: cursorStyle }"
    class="bg-amber-100 h-[calc(100vh-2rem)] sticky top-[2rem] right-0"
  >
    <div class="relative flex flex-col h-full">
      <!-- Header -->
      <div class="w-full h-[3rem] flex bg-amber-200 border-b border-amber-300">
        <div @click="isActive = !isActive" class='h-full aspect-square flex items-center justify-center hover:bg-amber-300 transition-colors'>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="h-full flex-1 inline-flex items-center px-3 font-medium">
          <div>Markdown Editor</div>
        </div>
        <div 
          class="h-full aspect-square flex items-center justify-center hover:bg-red-400 transition-colors text-red-700"
          @click.stop="$emit('delete', id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="flex flex-col w-full bg-amber-200 border-b border-amber-300">
        <!-- Row 1: Bold, Italic, Strikethrough, Code -->
        <div class="flex w-full">
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleBold">
            <b>B</b>
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleItalic">
            <i>I</i>
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleStrikethrough">
            <span class="line-through">S</span>
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleCodeBlock">
            <code>Code</code>
          </div>
        </div>
        
        <!-- Row 2: H1, H2, Bullet List, Numbered List -->
        <div class="flex w-full">
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleH1">
            H1
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleH2">
            H2
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleBulletList">
            • List
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleNumberedList">
            1. List
          </div>
        </div>
        
        <!-- Row 3: Quote, Link, Image, HR -->
        <div class="flex w-full">
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleQuote">
            ❝ Quote
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleLink">
            🔗 Link
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleImage">
            🖼️ Img
          </div>
          <div class="flex items-center justify-center p-1 h-10 flex-1 bg-amber-300 hover:bg-amber-400 cursor-pointer transition-colors" @click.stop="handleHr">
            ― HR
          </div>
        </div>
      </div>

      <!-- Text Editor -->
      <textarea
        ref="refInput"
        class="flex-grow bg-amber-50 w-full p-3 box-border resize-none focus:outline-none"
        v-model="localValue"
        @input="handleInput"
        :disabled="!isActive || id === null || id === undefined"
        :placeholder="id !== null && id !== undefined ? 'Type your markdown here...' : 'Select a box to edit'"
      ></textarea>

      <!-- Resize Handle -->
      <div
        class="absolute top-0 left-0 h-full cursor-ew-resize z-50"
        :style="{ width: RESIZE_MARGIN + 'px' }"
        @mousedown="checkStartResize"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.no-select {
  user-select: none;
}

/* Add smooth transitions */
.transition-colors {
  transition: background-color 0.2s ease;
}

.transition-opacity {
  transition: opacity 0.2s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d6d3d1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a29e;
}
</style>