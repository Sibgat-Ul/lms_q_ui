<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { authStore } from 'src/stores/auth_store.js'

export default defineComponent({
  name: 'App',
  setup() {
    let auth_store = authStore()
  }
})
</script>
