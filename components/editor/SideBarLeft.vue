<script setup>
import { ref, onMounted } from 'vue'

const isActive = ref(true)
const setWidth = ref(300)
const sidebarRef = ref(null)
const cursorStyle = ref('default')
let isResizing = false

const RESIZE_MARGIN = ref(10)

const checkStartResize = (e) => {
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left

  if (rect.width - offsetX <= RESIZE_MARGIN.value) {
    e.preventDefault()
    isResizing = true
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stop)
  }
}

const checkCursor = (e) => {
  const rect = sidebarRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left

  cursorStyle.value = (rect.width - offsetX <= RESIZE_MARGIN.value)
    ? 'ew-resize'
    : 'default'
}

const resetCursor = () => {
  cursorStyle.value = 'default'
}

const resize = (e) => {
  if (isResizing){
    setWidth.value = Math.min(500, Math.max(200, e.clientX))
  }
}

const stop = () => {
  isResizing = false
  document.body.classList.remove('no-select')
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stop)
}


</script>

<template>
    <div ref="sidebarRef"
    @mousemove="checkCursor"
    @mouseleave="resetCursor"
    :style="{ width: setWidth + 'px', cursor: cursorStyle }"
    :class="['top-[2rem] float-left left-0 shrink-0 bg-amber-100 ', isActive ? 'h-[calc(100vh-2rem)] sticky' : 'h-fit fixed']">
        <div class="relative flex flex-col h-full">
            <div class="w-full h-[3rem] flex bg-red-200">
                <div @click="isActive = !isActive" class='h-full aspect-1/1 overflow-hidden bg-green-200 m-0 p-0'>
                    H
                </div>
                <div class="h-full flex-1 inline-flex bg-blue-200 items-center m-0 p-0">
                    <div>More Content Here</div>
                </div>
            </div>
            <div id="Notebooks" :class="['overflow-y-auto max-h-[calc(100vh-3rem-2rem)]', isActive ? 'visible' : 'hidden']">
                <ul class="h-full">
                    <li v-for="item in 50" class="my-[.1rem] py-[.5rem] rounded-md duration-50 hover:bg-blue-200 ">test item {{ item }}</li>
                </ul>
            </div>
            
            <div
                ref="rightHandle"
                class="absolute top-0 right-0 h-full bg-amber-50 cursor-ew-resize z-50"
                :style="{ width: RESIZE_MARGIN + 'px' }"
                @mousedown="checkStartResize"
            >
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>