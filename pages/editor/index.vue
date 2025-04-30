<script setup>
import SideBarLeft from '~/components/editor/SideBarLeft.vue';
import SideBarRight from '~/components/editor/SideBarRight.vue';

definePageMeta({
    hideNavbar: true
})

</script>
<template>
    
    <div class="flex bg-amber-200 padding-top-2rem">
        <EditorNavBar />
        <SideBarLeft />
        
        <div class="h-full flex w-auto flex-col justify-center items-center">
            <div>Editor Page Content, Open NOTEBOOK here</div>
            <div v-for="item in 50">test {{ item }}</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita repellendus, aliquam eaque cupiditate eveniet laborum tenetur suscipit est quos nam quo? Eaque animi ab explicabo nobis, quae veniam soluta omnis?</div>
            <div v-for="item in 100">test {{ item }}</div>
        </div>
        <SideBarRight />
    </div>
</template>

<style scoped>

</style>