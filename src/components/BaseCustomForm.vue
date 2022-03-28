<template>
  <van-cell-group :inset="config.insert" :class="config.globalClass">
    <van-cell v-for="item, index in props.config.options" :key="index">
      <slot v-if="item.slot" :name="item.slot" />
      <template v-else>
        <!-- Text -->
        <van-field
          v-if="item.fieldType === 'Text'"
          v-model="state.data[item.name]"
          v-bind="item.fieldConfig"
          :label="item.label || item.name"
          :placeholder="item.placeholder || `Please input ${item.label}`"
          :disabled="item.disabled"
          :readonly="item.readonly !== undefined ? item.readonly : item.popupType !== undefined"
          :required="item.required"
          :clearable="item.clearable"
          :is-link="item.is_link !== undefined ? item.is_link : item.popupType !== undefined"
          :left-icon="item.left_icon"
          :right-icon="item.right_icon"
          :rules="item.rules"
          @click="item.popupType ? state.show[item.name] = true : undefined"
        />
        <van-field v-else-if="item.inline !== false" :label="item.label || item.name" readonly>
          <template #input>
            <!-- Radio - inline -->
            <van-radio-group
              v-if="item.fieldType === 'Radio'"
              v-model="state.data[item.name]"
              v-bind="item.radioConfig"
            >
              <van-radio
                v-for="opt, idx in item.radioConfig?.options"
                :key="`${item.name}-${idx}`"
                v-bind="opt"
                :name="opt.name !== undefined ? opt.name : idx.toString()"
                class="base-box"
              >{{ opt.label }}</van-radio>
            </van-radio-group>
            <!-- Checkbox - inline -->
            <van-checkbox-group
              v-if="item.fieldType === 'Checkbox'"
              v-model="state.array[item.name]"
              v-bind="item.checkboxConfig"
            >
              <van-checkbox
                v-for="opt, idx in item.checkboxConfig?.options"
                :key="`${item.name}-${idx}`"
                v-bind="opt"
                :name="opt.name !== undefined ? opt.name : idx.toString()"
                :shape="opt.shape || 'square'"
                @click="onCheckboxClick(item.name)"
                class="base-box"
              >{{ opt.label }}</van-checkbox>
            </van-checkbox-group>
            <!-- Switch - inline -->
            <van-switch
              v-if="item.fieldType === 'Switch'"
              v-model="state.data[item.name]"
              v-bind="item.switchConfig"
            />
            <!-- Slider - inline -->
            <van-slider
              v-if="item.fieldType === 'Slider'"
              v-model="state.data[item.name]"
              v-bind="item.sliderConfig"
            />
            <!-- Stepper - inline -->
            <van-stepper
              v-if="item.fieldType === 'Stepper'"
              v-model="state.data[item.name]"
              v-bind="item.stepperConfig"
            />
            <!-- Rate - inline -->
            <van-rate
              v-if="item.fieldType === 'Rate'"
              v-model="state.data[item.name]"
              v-bind="item.rateConfig"
            />
          </template>
        </van-field>
        <template v-else>
          <van-cell :title="item.label || item.name" :border="false" />
          <div class="base-box-container">
            <!-- Radio - outbox -->
            <van-radio-group
              v-if="item.fieldType === 'Radio'"
              v-model="state.data[item.name]"
              v-bind="item.radioConfig"
            >
              <van-radio
                v-for="opt, idx in item.radioConfig?.options"
                :key="`${item.name}-${idx}`"
                v-bind="opt"
                :name="opt.name !== undefined ? opt.name : idx.toString()"
                class="base-box"
              >{{ opt.label }}</van-radio>
            </van-radio-group>
            <!-- Checkbox - outbox -->
            <van-checkbox-group
              v-if="item.fieldType === 'Checkbox'"
              v-model="state.array[item.name]"
              v-bind="item.checkboxConfig"
            >
              <van-checkbox
                v-for="opt, idx in item.checkboxConfig?.options"
                :key="`${item.name}-${idx}`"
                v-bind="opt"
                :name="opt.name !== undefined ? opt.name : idx.toString()"
                :shape="opt.shape || 'square'"
                @click="onCheckboxClick(item.name)"
                class="base-box"
              >{{ opt.label }}</van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
        <!-- Popup -->
        <van-popup
          v-if="item.popupType"
          :show="state.show[item.name]"
          v-bind="item.popupConfig"
          :position="item.popupConfig?.position || 'bottom'"
        >
          <!-- Picker -->
          <van-picker
            v-if="item.popupType === 'Picker'"
            v-bind="item.pickerConfig"
            @confirm="value => confirmPicker(item.name, value)"
            @cancel="hidePopup(item.name)"
          />
          <!-- DatetimePicker -->
          <van-datetime-picker
            v-if="item.popupType === 'DatetimePicker'"
            v-model="state.currentDate"
            v-bind="item.datetimeConfig"
            @confirm="confirmDatetimePicker(item.name, item.datetimeConfig?.type)"
            @cancel="hidePopup(item.name)"
          />
          <!-- Area -->
          <van-area
            v-if="item.popupType === 'Area'"
            v-bind="item.areaConfig"
            :area-list="item.areaConfig?.['area-list'] || areaList"
            @confirm="result => confirmArea(item.name, result)"
            @cancel="hidePopup(item.name)"
          />
          <!-- Cascader -->
          <van-cascader
            v-if="item.popupType === 'Cascader'"
            :v-model="fieldTypeCheck(state.data[item.name]) ? state.data[item.name] : undefined"
            v-bind="item.cascaderConfig"
            @finish="data => confirmCascader(item.name, data)"
            @close="hidePopup(item.name)"
          />
        </van-popup>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
import type { DatetimePickerType, AreaColumnOption, CascaderOption } from 'vant'
import { areaList } from '@vant/area-data'
import type { Data } from '@/models'
import type { Config } from '@/models/types'

type propsType = {
  data: Data,
  config: Config<Data>
}

type stateType = {
  data: Data,
  show: { [key: string]: boolean },
  array: { [key: string]: string[] | number[] },
  currentDate: Date
}

const props = defineProps<propsType>()
const state: stateType = reactive({
  data: {} as Data,
  show: {},
  array: {},
  currentDate: new Date()
})

function onCheckboxClick(key: keyof Data) {
  const value = state.array[key].join(',')
  setData(key, value)
}

function confirmPicker(key: keyof Data, value: string) {
  setData(key, value)
  hidePopup(key)
}

function confirmDatetimePicker(key: keyof Data, type: DatetimePickerType = 'datetime') {
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

function confirmArea(key: keyof Data, result: AreaColumnOption[]) {
  const province = result[0].name
  const city = result[1].name
  const county = result[2].name
  const value = city === county ? `${city} ${county}` : `${province} ${city} ${county}`
  setData(key, value)
  hidePopup(key)
}

function confirmCascader(key: keyof Data, data: { value: string | number, selectedOptions: CascaderOption[], tabIndex: number }) {
  const value = data.selectedOptions.map(option => option.text).join('/')
  setData(key, value)
  hidePopup(key)
}

//* utils

function setData(key: keyof Data, value: string | number) {
  state.data[key] = value
}

function hidePopup(key: keyof Data) {
  state.show[key] = false
}

function convertDatetime(value: number): number | string {
  return value > 9 ? value : '0' + value
}

function convertToString(value: unknown): string {
  if (typeof value === 'string') {
    return value
  } else {
    return ''
  }
}

function fieldTypeCheck(value: unknown): boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'undefined'
}

onMounted(() => {
  state.data = props.data
  props.config.options.forEach(option => {
    if (option.fieldType === undefined) {
      option.fieldType = 'Text'
    }
    if (state.data[option.name] === undefined && option.default !== undefined) {
      state.data[option.name] = option.default
    }
    if (option.fieldType === 'Checkbox') {
      state.array[option.name] = state.data[option.name] ? convertToString(state.data[option.name]).split(',') : []
    }
  })
})
</script>

<style scoped>
.base-box-container {
  padding-left: 2rem;
}

.base-box {
  margin-bottom: 0.5rem;
}
</style>
