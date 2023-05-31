<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '../src/components/HeaderComponent.vue'

</script>
<script>
export default {
  data() {
    return {}
  },
  methods: {
  }
}
</script>
<template>
  <HeaderComponent />
  <main style="margin-top: 65px;">
    <RouterView />
  </main>
</template>

<style scoped></style>
