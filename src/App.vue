<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '../src/components/HeaderComponent.vue'
import Sidebar from './components/Sidebar.vue';

</script>
<!-- <script>
export default {
  data() {

  },
  methods: {
  }
}
</script> -->
<template>
  <HeaderComponent />
  <!-- <Sidebar /> -->
  <main style="margin-top: 55px;">
    <RouterView />
  </main>
  
</template>

<style scoped></style>
