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
  <main style="margin-top: 55px;">
    <RouterView />
  </main>
  
</template>

<style scoped></style>
