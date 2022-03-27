<template>
  <div>
    <BaseCustomForm :config="state.config" :data="state.data">
      <template #slot-test>
        <div>Test Slot</div>
      </template>
    </BaseCustomForm>
    <van-button round block type="primary" @click="onSubmit">Submit</van-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import CustomForm from '@/components/CustomForm.vue'
import BaseCustomForm from './components/BaseCustomForm.vue'
import type { Data } from '@/models'
import type { Config } from '@/models/types'

type stateType = {
  data: Data,
  config: Config<Data>
}

const state: stateType = reactive({
  data: {} as Data,
  config: {
    globalClass: 'form',
    insert: true,
    options: [
      { name: 'name', label: 'Name' },
      { name: 'password', label: 'Password' },
      { name: 'age', label: 'Age' },
      { name: 'address', slot: 'slot-test' },
      {
        name: 'gender', label: 'Gender', fieldType: 'Radio', inline: false,
        radioConfig: { options: [{ label: 'Male' }, { label: 'Female' }], direction: 'horizontal' }
      },
      {
        name: 'hobby', label: 'Hobby', fieldType: 'Checkbox', inline: false,
        checkboxConfig: { options: [{ label: 'Basketball' }, { label: 'Football' }] }
      },
      { name: 'toggle', label: 'Toggle', fieldType: 'Switch' },
      { name: 'length', label: 'Length', fieldType: 'Slider' },
      { name: 'count', label: 'Count', fieldType: 'Stepper' },
      {
        name: 'city', label: 'City', popupType: 'Picker',
        pickerConfig: { title: 'picker', columns: ['常州', '扬州'], 'default-index': 1 }
      },
      {
        name: 'date', label: 'Date', popupType: 'DatetimePicker',
        datetimeConfig: { title: 'datetime', type: 'date' }
      },
      { name: 'area', label: 'Area', popupType: 'Area' },
      {
        name: 'place', label: 'Place', popupType: 'Cascader',
        cascaderConfig: {
          title: 'cascader', options: [
            { text: '上海', value: '上海', children: [{ text: '上海市', value: '上海市' }] },
            { text: '北京', value: '北京', children: [{ text: '北京市', value: '北京市' }] }
          ]
        }
      }
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
