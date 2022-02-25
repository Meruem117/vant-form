<template>
  <div>
    <CustomForm :config="state.config" :data="state.data">
      <template #slot-test>
        <div>Test Slot</div>
      </template>
    </CustomForm>
    <van-button round block type="primary" @click="onSubmit">Submit</van-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CustomForm from './components/CustomForm.vue'
import type { configType, dataType } from './models'

type stateType = {
  data: dataType,
  config: configType<dataType>
}

const state: stateType = reactive({
  data: {} as dataType,
  config: {
    options: [
      { name: 'name', label: 'Name' },
      { name: 'password', label: 'Password' },
      { name: 'age', label: 'Age' },
      { name: 'address', slot: 'slot-test' },
      { name: 'city', label: 'City', popupType: 'Picker', columns: ['常州', '扬州'] },
      { name: 'date', label: 'Date', popupType: 'DatetimePicker', dateType: 'date' }
    ]
  }
})

function onSubmit() {
  console.log(state.data)
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
