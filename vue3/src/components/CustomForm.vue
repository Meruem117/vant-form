<template>
  <van-form>
    <van-cell-group :inset="config.insert">
      <van-field
        v-for="item, index in config.options"
        :key="index"
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
    </van-cell-group>
    <van-button round block type="primary" @click="onSubmit">Submit</van-button>
  </van-form>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
// import type { FormInstance } from 'vant'
import type { configType, dataType } from '../models'

const props = defineProps<{ config: configType<dataType> }>()
const state: { data: dataType } = reactive({
  data: {} as dataType
})
// const form = ref<FormInstance>()

function onSubmit() {
  console.log(state.data)
}

onMounted(() => state.data = props.config.data)
</script>

<style scoped>
</style>
