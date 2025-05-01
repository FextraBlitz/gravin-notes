<script setup>
import { ref } from 'vue'

const isActive = ref(false)
</script>

<template>
    <div :class="['top-[2rem] float-left left-0 w-[22.5%] shrink-0 bg-amber-100 ', isActive ? 'h-[calc(100vh-2rem)] sticky' : 'h-fit fixed']">
        <div class="w-full h-15 flex bg-red-200">
            <div @click="isActive = !isActive" class='h-full aspect-1/1 overflow-hidden bg-green-200 m-0 p-0'>
                H
            </div>
            <div class="h-full flex-1 inline-flex bg-blue-200 items-center m-0 p-0">
                <div>More Content Here</div>
            </div>
        </div>
        <div id="Notebooks" :class="['overflow-y-auto h-full', isActive ? 'visible' : 'hidden']">
            <ul>
                <li v-for="item in 50" class="my-[.1rem] py-[.5rem] rounded-md duration-50 hover:bg-blue-200 ">test item {{ item }}</li>
            </ul>
        </div>  
    </div>
</template>

<style scoped>

</style>