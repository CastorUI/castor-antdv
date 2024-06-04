<template>
  <component :is="customComponents[componentKey]" :v-model:component-data="record[dataField]" :model="record"
    :dataField="dataField" :handleEmit="handleEmit" />
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  customComponents: {
    type: Object,
    default: () => { },
  },
  componentKey: {
    type: String,
    default: '',
  },
  dataField: {
    type: String,
    default: '',
  },
  record: {
    type: Object,
    default: () => { },
  },
  handleEmit: {
    type: Function as PropType<(event: string, args?: object) => void>,
    default: () => { },
  },
});
</script>
<style lang="scss" scoped>
.command {
  padding: 4px 6px;
}
</style>
