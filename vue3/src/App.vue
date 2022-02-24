<template>
  <div>
    <CustomForm :config="config" />
    <van-button round block type="primary" @click="onClick">Submit</van-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CustomForm from './components/CustomForm.vue'
import type { configType, dataType } from './models'

const config: configType<dataType> = reactive({
  data: {} as dataType,
  // setData: (data: dataType) => { config.data = data },
  options: [
    { name: 'name', label: 'Name' },
    { name: 'password', label: 'Password' },
    { name: 'age', label: 'Age' },
    { name: 'address', label: 'Address' }
  ]
})

function onClick() {
  console.log(config.data)
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
