<template>
  <CustomForm :config="config" />
</template>

<script setup lang="ts">
import CustomForm from './components/CustomForm.vue'
import type { configType } from './models'

const config: configType = {
  options: [
    { label: 'Username' },
    { label: 'Password' },
    { label: 'Age' },
    { label: 'Address' }
  ]
}
</script>

<style>
html,
body {
  background-color: seashell;
}

#app {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: white;
}
</style>
