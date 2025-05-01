<script setup>
import { ref } from 'vue'

import { marked } from 'marked';
import DOMPurify from 'dompurify';

const isActive = ref(false)
</script>

<template>
    <div :class="['top-[2rem] w-[500px] grow-.7 bg-fuchsia-300', isActive ? 'h-[calc(100vh-2rem)] sticky' : 'h-fit fixed right-0']">
        
        <div id="Notebooks" :class="['overflow-y-scroll h-full', isActive ? 'visible' : 'hidden']">
            <ul>
               
            </ul>
        </div>  
    </div>    
</template>

<style scoped>

</style>