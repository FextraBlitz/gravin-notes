<script setup>
import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';



const realtimeRender = ref(false)
const render = ref(false)
</script>

<template>
    <textarea placeholder="Enter markdown here...">

    </textarea>
</template>

<style scoped>

</style>