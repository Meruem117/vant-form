<template>
  <van-radio-group v-if="config.fieldType === 'Radio'" v-model="data" v-bind="config.radioConfig">
    <van-radio
      v-for="opt, idx in config.radioConfig?.options"
      :key="`${config.name}-${idx}`"
      v-bind="opt"
      :name="opt.name !== undefined ? opt.name : idx.toString()"
      class="base-box"
    >{{ opt.label }}</van-radio>
  </van-radio-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, watch, ref } from 'vue'
import type { Data } from '@/models'
import type { ConfigOption } from '@/models/types'

type BaseProps = {
  data: unknown,
  config: ConfigOption<Data>,
  set: (data: string | number) => void
}

const props = defineProps<BaseProps>()
const data = ref()

watch(data, (data, preData) => {
  props.set(data)
})

onMounted(() => data.value = props.data)
</script>

<style scoped>
.base-box {
  margin-bottom: 0.5rem;
}
</style>
