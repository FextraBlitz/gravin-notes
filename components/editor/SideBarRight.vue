<script setup>
import { ref } from 'vue'


const isActive = ref(true)


defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
    <div :class="['flex flex-col top-[2rem] p-1 box-border w-[40%] bg-fuchsia-300 right-0', isActive ? 'h-[calc(100vh-2rem)] sticky' : 'h-fit fixed right-0']">
        <textarea ref="refInput" class="h-full [&_textarea]:h-full w-full resize-none focus:border-none outline-none " :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
        <div class="['w-full', ma]">

        </div>
    </div>    
</template>

<style scoped>

</style>