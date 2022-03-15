<template>
  <van-checkbox-group
    v-if="config.fieldType === 'Checkbox'"
    v-model="data"
    v-bind="config.checkboxConfig"
    class="base-box-group"
  >
    <van-checkbox
      v-for="opt, idx in config.checkboxConfig?.options"
      :key="`${config.name}-${idx}`"
      v-bind="opt"
      :name="opt.name !== undefined ? opt.name : idx.toString()"
      :shape="opt.shape || 'square'"
      class="base-box"
    >{{ opt.label }}</van-checkbox>
  </van-checkbox-group>
</template>

<script setup lang="ts">
import { defineProps, onMounted, watch, ref } from 'vue'
import type { Data } from '@/models'
import type { ConfigOption } from '@/models/types'

type propsType = {
  data: unknown,
  config: ConfigOption<Data>,
  set: (data: string | number) => void
}

const props = defineProps<propsType>()
const data = ref([])

watch(data, (data) => {
  props.set(data.join(','))
})

onMounted(() => data.value = props.data)
</script>

<style scoped>
.base-box {
  margin-bottom: 0.5rem;
}
</style>
