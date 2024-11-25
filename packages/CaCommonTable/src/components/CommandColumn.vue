<template>
  <Button
    v-for="(item, itemIndex) in commands"
    :key="itemIndex"
    class="command"
    type="link"
    :disabled="item.disableValidator && item.disableValidator({ row: record, item })"
    v-show="!item.visibleValidator || item.visibleValidator({ row: record, item })"
    v-bind="item.elementProps"
    @click="handleEmit(item.command, { row: record, index, item })"
  >
    {{ item.text }}
  </Button>
</template>

<script lang="ts" setup name="CommandColumn">
import { Button } from 'ant-design-vue'
import { PropType } from 'vue'

defineProps({
  commands: {
    type: Array<any>,
    default: () => []
  },
  handleEmit: {
    type: Function as PropType<(event: string, args?: object) => void>,
    default: () => {}
  },
  record: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
.command {
  padding: 0 6px;
}
</style>
