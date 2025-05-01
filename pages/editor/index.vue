<script setup>
import { ref } from 'vue'

import SideBarLeft from '~/components/editor/SideBarLeft.vue';
import SideBarRight from '~/components/editor/SideBarRight.vue';
import RegularText from '~/components/editor/content-types/RegularText.vue';

const currentTextboxText = ref('')
const renderMarkdown = ref(false)

definePageMeta({
    hideDefaultNavbar: true
});
</script>

<template>
  <EditorNavBar/>
  <div class="flex bg-amber-200">
    <!-- Navbar for mobile -->


    <!-- Left Sidebar -->
    <SideBarLeft/>
    
    <!-- Main Content -->
    <div class="h-full px-2 flex flex-col w-full justify-center items-center whitespace-pre-wrap break-words overflow-y-auto">
      <RegularText :text="currentTextboxText"/>
      <div class="text-center">Editor Page Content, Open NOTEBOOK here</div>
      <div v-for="item in 50" :key="'item-' + item">
        test {{ item }}
      </div>
      <div class="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita repellendus, aliquam eaque cupiditate eveniet laborum tenetur suscipit est quos nam quo? Eaque animi ab explicabo nobis, quae veniam soluta omnis?
      </div>
      <div v-for="item in 100" :key="'item-100-' + item">
        test {{ item }}
      </div>
    </div>

    <!-- Right Sidebar -->
    <SideBarRight v-model="currentTextboxText"/>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>