<template>
  <van-cell-group :inset="config.insert">
    <van-cell v-for="item, index in config.options" :key="index">
      <slot v-if="item.slot" :name="item.slot" />
      <van-field
        v-else
        v-model="state.data[item.name]"
        :label="item.label"
        :type="item.type"
        :disabled="item.disabled"
        :readonly="item.readonly"
        :center="item.center"
        :colon="item.colon"
        :clearable="item.clearable"
        :placeholder="item.placeholder || `Please input ${item.label}`"
      />
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
import type { configType, dataType } from '../models'

const props = defineProps<{ config: configType<dataType> }>()
const state: { data: dataType } = reactive({
  data: {} as dataType
})

onMounted(() => state.data = props.config.data)
</script>

<style scoped>
</style>
