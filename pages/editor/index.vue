<script setup>
import { ref } from 'vue'

import SideBarLeft from '~/components/editor/SideBarLeft.vue';
import SideBarRight from '~/components/editor/SideBarRight.vue';

const currentTextboxText = ref('')

definePageMeta({
    hideNavbar: true
});
</script>

<template>
  <div class="flex flex-col lg:flex-row bg-amber-200 pt-8 lg:pt-0">
    <!-- Navbar for mobile -->
    <EditorNavBar class="block lg:hidden mb-4" />

    <!-- Left Sidebar -->
    <SideBarLeft class="hidden lg:block w-full lg:w-1/4" />

    <!-- Main Content -->
    <div class="h-full flex flex-col w-full lg:w-1/2 justify-center items-center p-4">
      <div class="text-center mb-4">Editor Page Content, Open NOTEBOOK here</div>
      <div v-for="item in 50" :key="'item-' + item" class="text-sm">
        test {{ item }}
      </div>
      <div class="text-justify my-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita repellendus, aliquam eaque cupiditate eveniet laborum tenetur suscipit est quos nam quo? Eaque animi ab explicabo nobis, quae veniam soluta omnis?
      </div>
      <div v-for="item in 100" :key="'item-100-' + item" class="text-sm">
        test {{ item }}
      </div>
    </div>

    <!-- Right Sidebar -->
    <SideBarRight class="hidden lg:block w-full lg:w-1/4" v-model="currentTextboxText"/>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>