<script setup>
import { ref } from 'vue'


const refInput = ref(null)
defineExpose({ refInput })

const isActive = ref(true)
const props = defineProps({
  modelValue: String,
  id: [Number, String]
})

defineEmits(['update:modelValue', 'delete'])
</script>

<template>
    <div :class="['flex flex-col top-[2rem] box-border w-[40%] bg-fuchsia-300 right-0', isActive ? 'h-[calc(100vh-2rem)] sticky' : 'h-fit fixed right-0']">
        <div class="
        w-full h-[5rem]
        flex flex-col
        bg-emerald-200
        ">
            <div class="flex grow-1 items-center justify-center bg-red-200 font-bold" @click.stop="$emit('delete', id)">Delete Container</div>
            <div class="flex grow-1">
                <div class="flex grow-1 bg-orange-200 items-center justify-center">UNDO</div>
                <div class="flex grow-1 bg-green-200 items-center justify-center">REDO</div>
            </div>
        </div>
        <textarea ref="refInput" class="grow-1 bg-indigo-200 w-full p-1 box-border resize-none focus:border-none outline-none" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
    </div>    
</template>

<style scoped>

</style>