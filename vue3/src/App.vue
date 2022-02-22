<template>
  <CustomForm :config="config" />
</template>

<script setup lang="ts">
import CustomForm from './components/CustomForm.vue'
import type { configType } from './models'

const config: configType[] = [
  { label: 'Username' },
  { label: 'Password' },
  { label: 'Age' },
  { label: 'Address' }
]
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background-color: seashell;
}

#app {
  display: flex;
  justify-content: center;
  padding: 30px;
  background-color: white;
}
</style>
