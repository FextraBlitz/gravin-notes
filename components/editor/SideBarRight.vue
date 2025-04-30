<script setup>
import { ref } from 'vue'

const isActive = ref(false)
</script>

<template>
    <div :class="['top-[2rem] w-[500px] shrink-0 bg-fuchsia-300', isActive ? 'h-[calc(100vh-2rem)] sticky' : 'h-fit fixed right-0']">
        <div class="w-full h-15 flex bg-red-200">
            <div @click="isActive = !isActive" class='h-full aspect-1/1 overflow-hidden bg-slate-200 m-0 p-0'>
                H
            </div>
            <div class="h-full flex-1 inline-flex bg-fuchsia-200 items-center m-0 p-0">
                <div>More Content Here</div>
            </div>
        </div>
        <div id="Notebooks" :class="['overflow-y-scroll h-full', isActive ? 'visible' : 'hidden']">
            <ul>
                <li v-for="item in 6" class="py-[1rem]">right content test</li>
                
            </ul>
        </div>  
    </div>    
</template>

<style scoped>

</style>