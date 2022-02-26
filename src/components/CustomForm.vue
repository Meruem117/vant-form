<template>
  <van-cell-group :inset="config.insert" :class="config.globalClass">
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
      <van-popup
        v-if="item.popupType"
        :show="state.show[item.name]"
        v-bind="{ ...item.popupConfig }"
        :position="item.popupConfig?.position || 'bottom'"
      >
        <van-picker
          v-if="item.popupType === 'Picker' && item.pickerConfig"
          :columns="item.pickerConfig.columns"
          :title="item.pickerConfig.title"
          :confirm-button-text="item.pickerConfig.confirm_button_text"
          :cancel-button-text="item.pickerConfig.cancel_button_text"
          :toolbar-position="item.pickerConfig.toolbar_position"
          :loading="item.pickerConfig.loading"
          :show-toolbar="item.pickerConfig.show_toolbar"
          :default-index="item.pickerConfig.default_index"
          :item-height="item.pickerConfig.item_height"
          :visible-item-count="item.pickerConfig.visible_item_count"
          :swipe-duration="item.pickerConfig.swipe_duration"
          @confirm="value => confirmPicker(item.name, value)"
          @cancel="hidePopup(item.name)"
        />
        <van-datetime-picker
          v-if="item.popupType === 'DatetimePicker'"
          v-model="state.currentDate"
          :type="item.datetimeConfig?.type"
          :title="item.pickerConfig?.title"
          :confirm-button-text="item.pickerConfig?.confirm_button_text"
          :cancel-button-text="item.pickerConfig?.cancel_button_text"
          :toolbar-position="item.pickerConfig?.toolbar_position"
          :loading="item.pickerConfig?.loading"
          :show-toolbar="item.pickerConfig?.show_toolbar"
          :default-index="item.pickerConfig?.default_index"
          :item-height="item.pickerConfig?.item_height"
          :visible-item-count="item.pickerConfig?.visible_item_count"
          :swipe-duration="item.pickerConfig?.swipe_duration"
          @confirm="confirmDatetimePicker(item.name, item.datetimeConfig?.type)"
          @cancel="hidePopup(item.name)"
        />
        <van-area
          v-if="item.popupType === 'Area'"
          :area-list="item.areaConfig?.areaList || areaList"
          @confirm="result => confirmArea(item.name, result)"
          @cancel="hidePopup(item.name)"
        />
      </van-popup>
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
