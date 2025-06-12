<template>
  <Button :class="[elementProps.ellipsis ? 'nowrap-link' : 'wrap-link', 'link-class']" type="link"
    @click="handleEmit(command, { row: record, index })">
    {{ record[dataField] }}
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import { PropType } from 'vue';

defineProps({
  command: {
    type: String,
    default: '',
  },
  dataField: {
    type: String,
    default: '',
  },
  handleEmit: {
    type: Function as PropType<(event: string, args?: object) => void>,
    default: () => { },
  },
  record: {
    type: Object,
    default: () => { },
  },
  index: {
    type: Number,
    default: 0,
  },
  elementProps: {
    type: Object,
    default: () => { },
  },
});
</script>
<style lang="scss" scoped>
.link-class {
  width: 100%;
}

.nowrap-link {
  :deep(span) {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.wrap-link {
  :deep(span) {
    width: 100%;
    white-space: normal;
  }
}
</style>
