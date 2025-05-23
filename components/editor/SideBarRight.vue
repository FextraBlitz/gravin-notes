```vue
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const refInput = ref(null)
defineExpose({ refInput })

const isActive = ref(true)
const localValue = ref('')
const isKeyboardVisible = ref(false)

const setWidth = ref(300)
const sidebarRef = ref(null)
const cursorStyle = ref('default')
let isResizing = false
const RESIZE_MARGIN = 10
const MIN_WIDTH = 200
const MAX_WIDTH = 600

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

const emit = defineEmits(['update:modelValue', 'delete', 'undo', 'redo', 'close'])

const isMobile = inject('isMobile')

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined && newVal !== localValue.value) {
    localValue.value = newVal || ''
  }
}, { immediate: true })

watch(() => props.id, () => {
  localValue.value = props.modelValue || ''
  if (isMobile && refInput.value) {
    nextTick(() => {
      refInput.value.focus()
    })
  }
}, { immediate: true })

const handleInput = (event) => {
  if (props.id !== null && props.id !== undefined) {
    const newValue = event.target.value
    localValue.value = newValue
    emit('update:modelValue', newValue)
    console.log('Text input:', { id: props.id, value: newValue })
  }
}

const checkStartResize = (e) => {
  if (isMobile || !sidebarRef.value) return
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = rect.left - e.clientX
  if (offsetX >= -RESIZE_MARGIN && offsetX <= 0) {
    e.preventDefault()
    isResizing = true
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stop)
    console.log('Right resize started', { offsetX, rectLeft: rect.left })
  }
}

const checkCursor = (e) => {
  if (isMobile || !sidebarRef.value) return
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = rect.left - e.clientX
  cursorStyle.value = (offsetX >= -RESIZE_MARGIN && offsetX <= 0) ? 'ew-resize' : 'default'
}

const resetCursor = () => {
  cursorStyle.value = 'default'
}

const resize = (e) => {
  if (isResizing && sidebarRef.value) {
    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, window.innerWidth - e.clientX))
    setWidth.value = newWidth
    requestAnimationFrame(() => {
      sidebarRef.value.style.width = `${newWidth}px`
    })
    console.log('Right resizing', { newWidth, clientX: e.clientX })
  }
}

const stop = () => {
  isResizing = false
  document.body.classList.remove('no-select')
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stop)
  console.log('Right resize stopped')
}

const handleBold = () => {
  console.log('Bold clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('**')
}
const handleItalic = () => {
  console.log('Italic clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('*')
}
const handleStrikethrough = () => {
  console.log('Strikethrough clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('~~')
}
const handleInlineCode = () => {
  console.log('InlineCode clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('`')
}
const handleCodeBlock = () => {
  console.log('CodeBlock clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('```\n', '\n```')
}
const handleQuote = () => {
  console.log('Quote clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('> ', '', true)
}
const handleBulletList = () => {
  console.log('BulletList clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('- ', '', true)
}
const handleNumberedList = () => {
  console.log('NumberedList clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('1. ', '', true)
}
const handleLink = () => {
  console.log('Link clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('[', '](url)')
}
const handleH1 = () => {
  console.log('H1 clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('# ', '', true)
}
const handleH2 = () => {
  console.log('H2 clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('## ', '', true)
}
const handleImage = () => {
  console.log('Image clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('![alt](url)', '', true)
}
const handleHr = () => {
  console.log('Hr clicked', { id: props.id, selection: refInput.value?.selectionStart })
  wrapSelection('\n---\n', '')
}

function wrapSelection(before, after = before, multiline = false) {
  const el = refInput.value
  if (!el || props.id === null || props.id === undefined) {
    console.warn('Cannot wrap selection: No textarea or invalid block ID', { el, id: props.id })
    return
  }

  const start = el.selectionStart
  const end = el.selectionEnd
  const fullText = localValue.value
  const selected = fullText.slice(start, end)

  console.log('Wrapping selection', { start, end, selected, before, after, multiline })

  const hasWrapper = selected.startsWith(before) && selected.endsWith(after)
  let newText, cursorStart, cursorEnd

  if (!multiline) {
    if (hasWrapper && after !== '') {
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
  emit('update:modelValue', newText)
  console.log('Emitted new text', { newText, cursorStart, cursorEnd })

  nextTick(() => {
    el.focus()
    el.selectionStart = cursorStart
    el.selectionEnd = cursorEnd
  })
}

onMounted(() => {
  const checkKeyboard = () => {
    isKeyboardVisible.value = window.innerHeight < window.visualViewport.height + 100
  }
  window.visualViewport?.addEventListener('resize', checkKeyboard)
  return () => window.visualViewport?.removeEventListener('resize', checkKeyboard)
})
</script>

<template>
  <div
    ref="sidebarRef"
    :class="{ 'sidebar-container': true, 'mobile-sidebar': isMobile, 'is-resizing': isResizing }"
    :style="!isMobile ? { width: setWidth + 'px', cursor: cursorStyle } : {}"
    @mousemove="checkCursor"
    @mouseleave="resetCursor"
    @mousedown="checkStartResize"
    role="complementary"
    aria-label="Markdown editor"
  >
    <div class="sidebar-content">
      <!-- Header -->
      <div class="header">
        <button
          v-if="isMobile"
          @click="$emit('close')"
          class="close-button"
          aria-label="Close editor"
        >
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x.svg" alt="Close icon" class="icon">
        </button>
        <button
          v-else
          @click="isActive = !isActive"
          class="toggle-button"
          :aria-label="isActive ? 'Collapse editor' : 'Expand editor'"
        >
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/menu.svg" alt="Menu icon" class="icon">
        </button>
        <div v-if="!isMobile && isActive" class="header-title">
          Markdown Editor
        </div>
        <button
          @click="$emit('delete', id)"
          class="delete-button"
          aria-label="Delete block"
        >
          <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg" alt="Delete icon" class="icon">
        </button>
      </div>
      <!-- Toolbar -->
      <div v-if="isActive || isMobile" class="toolbar" :style="isMobile && isKeyboardVisible ? { bottom: '0px' } : {}">
        <!-- Desktop: Four-Item Grid -->
        <div v-if="!isMobile" class="toolbar-grid">
          <button @click="handleBold" class="toolbar-button" aria-label="Bold text"><b>B</b></button>
          <button @click="handleItalic" class="toolbar-button" aria-label="Italic text"><i>I</i></button>
          <button @click="handleStrikethrough" class="toolbar-button" aria-label="Strikethrough text"><span class="line-through">S</span></button>
          <button @click="handleCodeBlock" class="toolbar-button" aria-label="Code block"><code>Code</code></button>
          <button @click="handleH1" class="toolbar-button" aria-label="Heading 1">H1</button>
          <button @click="handleH2" class="toolbar-button" aria-label="Heading 2">H2</button>
          <button @click="handleBulletList" class="toolbar-button" aria-label="Bullet list">• List</button>
          <button @click="handleNumberedList" class="toolbar-button" aria-label="Numbered list">1. List</button>
          <button @click="handleQuote" class="toolbar-button" aria-label="Block quote">❝ Quote</button>
          <button @click="handleLink" class="toolbar-button" aria-label="Insert link">🔗 Link</button>
          <button @click="handleImage" class="toolbar-button" aria-label="Insert image">🖼️ Img</button>
          <button @click="handleHr" class="toolbar-button" aria-label="Horizontal rule">― HR</button>
        </div>
        <!-- Mobile: Scrollable Row -->
        <div v-else class="toolbar-row">
          <button @click="handleBold" class="toolbar-button" aria-label="Bold text"><b>B</b></button>
          <button @click="handleItalic" class="toolbar-button" aria-label="Italic text"><i>I</i></button>
          <button @click="handleStrikethrough" class="toolbar-button" aria-label="Strikethrough text"><span class="line-through">S</span></button>
          <button @click="handleCodeBlock" class="toolbar-button" aria-label="Code block"><code>Code</code></button>
          <button @click="handleH1" class="toolbar-button" aria-label="Heading 1">H1</button>
          <button @click="handleH2" class="toolbar-button" aria-label="Heading 2">H2</button>
          <button @click="handleBulletList" class="toolbar-button" aria-label="Bullet list">• List</button>
          <button @click="handleNumberedList" class="toolbar-button" aria-label="Numbered list">1. List</button>
          <button @click="handleQuote" class="toolbar-button" aria-label="Block quote">❝ Quote</button>
          <button @click="handleLink" class="toolbar-button" aria-label="Insert link">🔗 Link</button>
          <button @click="handleImage" class="toolbar-button" aria-label="Insert image">🖼️ Img</button>
          <button @click="handleHr" class="toolbar-button" aria-label="Horizontal rule">― HR</button>
        </div>
      </div>
      <!-- Text Editor -->
      <textarea
        v-if="isActive || isMobile"
        ref="refInput"
        class="editor"
        v-model="localValue"
        @input="handleInput"
        :disabled="!isActive || id === null || id === undefined"
        :placeholder="id !== null && id !== undefined ? 'Type your markdown here...' : 'Select a block to edit'"
        aria-label="Markdown text editor"
      ></textarea>
      <!-- Resize Handle (Desktop Only) -->
      <div
        v-if="!isMobile"
        class="resize-handle"
        @mousedown="checkStartResize"
        aria-hidden="true"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Sidebar Container */
.sidebar-container {
  background-color: #f9f9f9;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 600px;
  transition: width 0.2s ease;
}

/* Disable transition during resize */
.sidebar-container.is-resizing {
  transition: none;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding: 0;
}

/* Desktop Styling */
@media (min-width: 769px) {
  .sidebar-container {
    height: calc(100vh - 4rem);
    position: sticky;
    top: 4rem;
    z-index: 60;
  }
}

/* Resize Handle */
.resize-handle {
  width: 6px;
  background-color: #f3e8ff;
  opacity: 0.3;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 10;
}

.resize-handle:hover {
  opacity: 0.5;
}

/* Sidebar Content */
.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* Header */
.header {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem 0.375rem 0 0;
}

/* Close Button (Mobile) */
.close-button {
  height: 100%;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.close-button:hover {
  background-color: #f3e8ff;
}

/* Toggle Button (Desktop) */
.toggle-button {
  height: 100%;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.toggle-button:hover {
  background-color: #f3e8ff;
}

/* Header Title */
.header-title {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  font-weight: 500;
  color: #1f2937;
}

/* Delete Button */
.delete-button {
  height: 100%;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.delete-button:hover {
  background-color: #f3e8ff;
}

/* Toolbar */
.toolbar {
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem;
  position: sticky;
  z-index: 10;
}

/* Toolbar Grid (Desktop) */
.toolbar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

/* Toolbar Row (Mobile) */
.toolbar-row {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0 0.5rem;
  width: 100%;
}

/* Toolbar Button */
.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: white;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  min-width: 2.5rem;
  border: 1px solid transparent;
  cursor: pointer;
}

.toolbar-button:hover {
  background-color: #f3e8ff;
  color: #BD93F9;
}

/* Desktop Button Borders (Vertical Gradient) */
@media (min-width: 769px) {
  .toolbar-button {
    border-image: linear-gradient(
      to bottom,
      transparent,
      rgba(209, 213, 219, 0.5) 20%,
      rgba(209, 213, 219, 0.5) 80%,
      transparent
    ) 1;
    border-width: 1px;
    border-style: solid;
  }
}

/* Mobile Button Borders (Horizontal Gradient) */
@media (max-width: 768px) {
  .toolbar-button {
    border-image: linear-gradient(
      to right,
      transparent,
      rgba(209, 213, 219, 0.5) 20%,
      rgba(209, 213, 219, 0.5) 80%,
      transparent
    ) 1;
    border-width: 1px;
    border-style: solid;
  }
}

/* Editor */
.editor {
  flex-grow: 1;
  background-color: #f9f9f9;
  width: 100%;
  margin: 0;
  padding: 0.5rem 0.25rem;
  box-sizing: border-box;
  resize: none;
  border-radius: 0 0 0.375rem 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.editor:focus {
  outline: none;
  box-shadow: 0 0 0 2px #BD93F9;
}

.editor:disabled {
  background-color: #e5e7eb;
  cursor: not-allowed;
}

/* Icons */
.icon {
  height: 1.25rem;
  width: 1.25rem;
}

.close-button .icon,
.toggle-button .icon,
.delete-button .icon {
  filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

.close-button:hover .icon,
.toggle-button:hover .icon,
.delete-button:hover .icon {
  filter: invert(40%) sepia(57%) saturate(5135%) hue-rotate(247deg) brightness(98%) contrast(96%);
}

/* Text selection */
.editor::selection {
  background-color: rgba(189, 147, 249, 0.3);
  color: #333333;
}

.editor::-moz-selection {
  background-color: rgba(189, 147, 249, 0.3);
  color: #333333;
}

/* No-select */
.no-select {
  user-select: none;
}

/* Focus outline for accessibility */
*:focus-visible {
  outline: 2px solid #9580FF;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #BD93F9;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A775F0;
}
</style>
```