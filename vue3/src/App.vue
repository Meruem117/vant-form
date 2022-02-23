<template>
  <CustomForm :config="config" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CustomForm from './components/CustomForm.vue'
import type { configType, dataType } from './models'

const config: configType<dataType> = reactive({
  data: {} as dataType,
  options: [
    { name: 'name', label: 'Name' },
    { name: 'password', label: 'Password' },
    { name: 'age', label: 'Age' },
    { name: 'address', label: 'Address' }
  ]
})
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
