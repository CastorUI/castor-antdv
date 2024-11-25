<template>
  <div class="custom-info">
    <div class="user-info">
      <tag>{{ model.id }}</tag>
      <tag>{{ model.name }}</tag>
    </div>
    <div class="user-address">{{ model.address }}</div>
  </div>
</template>

<script lang="ts" setup>
import { Tag } from 'ant-design-vue'

defineProps({
  model: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.custom-info {
  .user-info {
    span {
      color: rgb(27, 87, 216);
      font-weight: bold;
    }
  }
  .user-address {
    margin-top: 6px;
    color: rgba(27, 87, 216, 0.8);
  }
}
</style>
