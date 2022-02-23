<template>
  <van-form>
    <van-cell-group :inset="config.insert">
      <van-field
        v-for="item, index in config.options"
        :key="index"
        :label="item.label"
        :type="item.type"
        :disabled="item.disabled"
        :readonly="item.readonly"
        :center="item.center"
        :colon="item.colon"
        :clearable="item.clearable"
        :placeholder="item.placeholder || `Please input ${item.label}`"
      />
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { configType } from '../models'

defineProps<{ config: configType }>()
</script>

<style scoped>
</style>
