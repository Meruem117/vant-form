<template>
  <van-cell-group :inset="config.insert">
    <van-cell v-for="item, index in props.config.options" :key="index">
      <slot v-if="item.slot" :name="item.slot" />
      <van-field
        v-else
        v-model="state.data[item.name]"
        :label="item.label"
        :type="item.fieldType"
        :disabled="item.disabled"
        :readonly="item.readonly || item.popupType !== undefined"
        :center="item.center"
        :colon="item.colon"
        :clearable="item.clearable"
        :placeholder="item.placeholder || `Please input ${item.label}`"
        @click="item.popupType ? state.show[item.name] = true : undefined"
      />
      <van-popup v-if="item.popupType" :show="state.show[item.name]" position="bottom">
        <van-picker
          v-if="item.popupType === 'Picker'"
          :columns="item.columns"
          @confirm="(value: never) => { state.data[item.name] = value, state.show[item.name] = false }"
          @cancel="state.show[item.name] = false"
        />
        <van-datetime-picker
          v-if="item.popupType === 'DatetimePicker'"
          v-model="state.currentDate"
          :type="item.dateType"
          @confirm="onConfirmDatetimePicker(item.name, item.dateType)"
          @cancel="state.show[item.name] = false"
        />
      </van-popup>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
import type { DatetimePickerType } from 'vant'
import type { configType, dataType, showType } from '../models'

type propsType = {
  data: dataType,
  config: configType<dataType>
}

type stateType = {
  data: dataType,
  show: showType,
  currentDate: Date
}

const props = defineProps<propsType>()
const state: stateType = reactive({
  data: {} as dataType,
  show: {},
  currentDate: new Date()
})

function onConfirmDatetimePicker(name: keyof dataType, type?: DatetimePickerType) {
  const { currentDate } = state
  const year = currentDate.getFullYear()
  const month = convertDatetime(currentDate.getMonth() + 1)
  const day = convertDatetime(currentDate.getDate())
  const hour = convertDatetime(currentDate.getHours())
  const minute = convertDatetime(currentDate.getMinutes())
  const second = convertDatetime(currentDate.getSeconds())
  let result = ''
  switch (type) {
    case 'date':
      result = `${year}-${month}-${day}`
      break
    case 'datehour':
      result = `${year}-${month}-${day} ${hour}`
      break
    case 'datetime':
      result = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
    case 'month-day':
      result = `${month}-${day}`
      break
    case 'time':
      result = `${hour}:${minute}`
      break
    case 'year-month':
      result = `${year}-${month}`
      break
    default:
      result = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  state.show[name] = false
  state.data[name] = result
}

function convertDatetime(value: number): number | string {
  return value > 9 ? value : '0' + value
}

onMounted(() => state.data = props.data)
</script>

<style scoped>
</style>
