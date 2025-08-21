<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonTable, TableField } from '#/castor-antdv'

const props = defineProps({
  model: {
    type: Object,
    default: () => {}
  },
  operateType: {
    type: String,
    default: 'add'
  }
})
const emits = defineEmits(['update:component-data'])

const columns = computed<Array<TableField>>(() => {
  return [
    {
      type: 'default',
      label: '日期',
      dataField: 'date',
      elementProps: {
        width: '100px'
      }
    },
    {
      type: 'default',
      label: '姓名',
      dataField: 'name',
      elementProps: {
        width: '100px'
      }
    },
    {
      type: 'default',
      label: '地址',
      dataField: 'address',
      elementProps: {
        width: '120px'
      }
    }
  ]
})

const getList = () => {
  table.loading = true
  setTimeout(() => {
    table.dataSource = [
      {
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }
    ]
    emits('update:component-data', table.dataSource)
    table.loading = false
  }, 200)
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: props.model.users,
  columns,
  pagination: false
})

getList()
</script>

<style lang="scss" scoped>
.common-table-container {
  padding-left: 12px;
}
</style>
