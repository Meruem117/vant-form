<template>
  <van-cell-group :inset="config.insert" :class="config.globalClass">
    <van-cell v-for="item, index in props.config.options" :key="index">
      <slot v-if="item.slot" :name="item.slot" />
      <div v-else>
        <van-field
          v-model="state.data[item.name]"
          :label="item.label"
          :type="item.type"
          :size="item.size"
          :maxlength="item.maxlength"
          :placeholder="item.placeholder || `Please input ${item.label}`"
          :border="item.border"
          :disabled="item.disabled"
          :readonly="item.readonly ? item.readonly : item.popupType !== undefined"
          :colon="item.colon"
          :required="item.required"
          :center="item.center"
          :clearable="item.clearable"
          :clear-icon="item.clear_icon"
          :is-link="item.is_link ? item.is_link : item.popupType !== undefined"
          :show-word-limit="item.show_word_limit"
          @click="item.popupType ? state.show[item.name] = true : undefined"
        />
        <van-popup
          v-if="item.popupType"
          :show="state.show[item.name]"
          v-bind="{ ...item.popupConfig }"
          :position="item.popupConfig?.position || 'bottom'"
        >
          <van-picker
            v-if="item.popupType === 'Picker'"
            v-bind="{ ...item.pickerConfig }"
            @confirm="value => confirmPicker(item.name, value)"
            @cancel="hidePopup(item.name)"
          />
          <van-datetime-picker
            v-if="item.popupType === 'DatetimePicker'"
            v-model="state.currentDate"
            v-bind="{ ...item.datetimeConfig }"
            @confirm="confirmDatetimePicker(item.name, item.datetimeConfig?.type)"
            @cancel="hidePopup(item.name)"
          />
          <van-area
            v-if="item.popupType === 'Area'"
            v-bind="{ ...item.areaConfig }"
            :area-list="item.areaConfig?.['area-list'] || areaList"
            @confirm="result => confirmArea(item.name, result)"
            @cancel="hidePopup(item.name)"
          />
        </van-popup>
      </div>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
import type { DatetimePickerType, AreaColumnOption } from 'vant'
import { areaList } from '@vant/area-data'
import type { configType, dataType } from '../models'

type propsType = {
  data: dataType,
  config: configType<dataType>
}

type stateType = {
  data: dataType,
  show: { [key: string]: boolean },
  currentDate: Date
}

const props = defineProps<propsType>()
const state: stateType = reactive({
  data: {} as dataType,
  show: {},
  currentDate: new Date()
})

function confirmPicker(key: keyof dataType, value: string) {
  setData(key, value)
  hidePopup(key)
}

function confirmDatetimePicker(key: keyof dataType, type: DatetimePickerType = 'datetime') {
  const { currentDate } = state
  const year = currentDate.getFullYear()
  const month = convertDatetime(currentDate.getMonth() + 1)
  const day = convertDatetime(currentDate.getDate())
  const hour = convertDatetime(currentDate.getHours())
  const minute = convertDatetime(currentDate.getMinutes())
  const second = convertDatetime(currentDate.getSeconds())
  let value = ''
  switch (type) {
    case 'date':
      value = `${year}-${month}-${day}`
      break
    case 'datehour':
      value = `${year}-${month}-${day} ${hour}`
      break
    case 'datetime':
      value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
    case 'month-day':
      value = `${month}-${day}`
      break
    case 'time':
      value = `${hour}:${minute}`
      break
    case 'year-month':
      value = `${year}-${month}`
      break
    default:
      value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  setData(key, value)
  hidePopup(key)
}

function convertDatetime(value: number): number | string {
  return value > 9 ? value : '0' + value
}

function confirmArea(key: keyof dataType, result: AreaColumnOption[]) {
  const province = result[0].name
  const city = result[1].name
  const county = result[2].name
  const value = city === county ? `${city} ${county}` : `${province} ${city} ${county}`
  setData(key, value)
  hidePopup(key)
}

function setData(key: keyof dataType, value: string | number) {
  state.data[key] = value
}

function hidePopup(key: keyof dataType) {
  state.show[key] = false
}

onMounted(() => state.data = props.data)
</script>

<style scoped>
</style>
