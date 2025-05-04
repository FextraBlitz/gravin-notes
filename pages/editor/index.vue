<script setup>
// --PAGE SETUP--
import { ref, watch, onMounted, nextTick } from 'vue'

import SideBarLeft from '~/components/editor/SideBarLeft.vue';
import SideBarRight from '~/components/editor/SideBarRight.vue';
import RegularText from '~/components/editor/content-types/RegularText.vue';

definePageMeta({
    hideDefaultNavbar: true
});



// --CONTAINER LOGIC--
const currentTextboxText = ref('')
const renderMarkdown = ref(false)

const activeId = ref(null)
const blocks = ref([
  { id: 1, text: 'Hello **Markdown**' },
  { id: 2, text: 'Another block' }
])

const getNextAvailableId = () => {
  const existingIds = blocks.value.map(b => b.id)
  let candidate = 1
  while (existingIds.includes(candidate)) {
    candidate++
  }
  return candidate
}


const nextId = ref(0)

const addBlock = () => {
  blocks.value.push({
    id: nextId.value++,
    text: ''
  })
  activeId.value = nextId.value - 1 // Make the new block active
}

const sidebarRef = ref(null)
const setActiveBlock = (id) => {
  activeId.value = id
  nextTick(() => {
    sidebarRef.value?.refInput?.focus()
  })
}

const deleteBlock = (idToDelete) => {
  blocks.value = blocks.value.filter(b => b.id !== idToDelete)
  if (activeId.value === idToDelete) {
    activeId.value = null
    currentTextboxText.value = ''
  }
}

const updateText = (newText) => {
  const block = blocks.value.find(b => b.id === activeId.value)
  if (block) block.text = newText
}

// --WATCHERS--
watch(activeId, (newId) => {
  const block = blocks.value.find(b => b.id === newId)
  currentTextboxText.value = block ? block.text : ''
})

// When textarea changes, update the current block's text
watch(currentTextboxText, (newText) => {
  const block = blocks.value.find(b => b.id === activeId.value)
  if (block) block.text = newText
})

onMounted(() => {
  nextId.value = getNextAvailableId()
})
</script>

<template>
  <EditorNavBar/>
  <div class="flex bg-amber-200">
    <!-- Navbar for mobile -->


    <!-- Left Sidebar -->
    <SideBarLeft/>
    
    <!-- Main Content -->
    <div class="h-full px-2 flex flex-col w-full justify-center items-center whitespace-pre-wrap break-words overflow-y-auto">
      <RegularText v-for="block in blocks"
      :key="block.id"
      :id="block.id"
      :text="block.text"
      :selected="block.id === activeId"
      @select="setActiveBlock"
      />


      <div
        @click="addBlock"
        class="flex my-1 w-full h-[3rem] bg-gray-200 px-2 py-1 items-center justify-center"
      >
        ADD BLOCK
      </div>
      
    </div>

    <!-- Right Sidebar -->
    <SideBarRight
      ref="sidebarRef"
      v-model="currentTextboxText"
      :id="activeId"
      @delete="deleteBlock"
    />
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>