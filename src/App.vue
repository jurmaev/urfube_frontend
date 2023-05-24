<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '../src/components/HeaderComponent.vue'

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
  <main style="margin-top: 65px;">
    <RouterView />
  </main>
  
</template>

<style scoped></style>
