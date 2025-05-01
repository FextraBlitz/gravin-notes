<script setup>
import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  text: String
})

const realtimeRender = ref(false)
const render = ref(false)

const renderedOutput = computed(() => {
  const dirty = render.value ? marked(props.text || '') : props.text
  return DOMPurify.sanitize(dirty)
})

</script>

<template>
    <div
        v-if="props.text && props.text.trim() !== ''" 
        v-html="renderedOutput"
        class="bg-cyan-200 w-full max-w-full px-2 py-1 whitespace-pre-wrap break-words overflow-y-auto text-balance"
    ></div>
</template>

<style scoped>
</style>