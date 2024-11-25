<template>
  <span
    v-if="options.some((r) => r.value === record[dataField])"
    :style="{
      color: options.filter((r) => r.value === record[dataField])[0].color,
    }"
  >
    {{ options.filter((r) => r.value === record[dataField])[0].label }}
  </span>
</template>

<script lang="ts" setup>
  defineProps({
    options: {
      type: Array<any>,
      default: () => [],
    },
    dataField: {
      type: String,
      default: '',
    },
    record: {
      type: Object,
      default: () => { },
    },
  })
</script>

<style lang="scss" scoped>
  .command {
    padding: 4px 6px;
  }
</style>
