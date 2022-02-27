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
  config: configType
}

const state: stateType = reactive({
  data: {} as dataType,
  config: {
    globalClass: 'form',
    insert: true,
    options: [
      { name: 'name', label: 'Name' },
      { name: 'password', label: 'Password' },
      { name: 'age', label: 'Age' },
      { name: 'address', slot: 'slot-test' },
      {
        name: 'city', label: 'City', popupType: 'Picker',
        pickerConfig: {
          title: 'picker', columns: ['常州', '扬州'], 'default-index': 1
        }
      },
      {
        name: 'date', label: 'Date', popupType: 'DatetimePicker',
        datetimeConfig: {
          title: 'datetime', type: 'date'
        }
      },
      { name: 'area', label: 'Area', popupType: 'Area' }
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
  background-color: #f2f4f6;
}

.form {
  margin: 20px;
  background-color: white;
}
</style>
