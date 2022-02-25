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
          @confirm="(value: never) => { state.data[item.name] = value, state.show[item.name] = false }"
          @cancel="state.show[item.name] = false"
        />
      </van-popup>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
import type { configType, dataType, showType } from '../models'

type propsType = {
  data: dataType,
  config: configType
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

onMounted(() => state.data = props.data)
</script>

<style scoped>
</style>
