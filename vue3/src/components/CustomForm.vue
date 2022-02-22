<template>
  <van-form>
    <van-cell-group inset>
      <van-field
        v-for="item, index in config.options"
        :key="index"
        :label="item.label"
        :type="item.type"
        :placeholder="`Please input ${item.label}`"
      />
    </van-cell-group>
    <div>
      <van-button round block type="primary" native-type="submit">Submit</van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { configType } from '../models'

defineProps<{ config: configType }>()
</script>

<style scoped>
</style>
