<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '../src/components/HeaderComponent.vue'

</script>
<script>
export default {
  data() {
    return {
     username: '' 
    }
  },
  methods: {
    logUser(username) {
      this.username = username
    }
  }
}
</script>
<template>
  <HeaderComponent  />
  <RouterView  />
</template>

<style scoped></style>
