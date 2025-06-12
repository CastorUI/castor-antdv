<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonTable, SelectItem, TableField } from '#/castor-antd'

const optionsMap = reactive<Record<string, SelectItem[]>>({
  status: [
    {
      value: 4,
      label: '未开始',
      color: '#4a90e2'
    },
    {
      value: 1,
      label: '进行中',
      color: '#f5a623'
    },
    {
      value: 2,
      label: '已驳回',
      color: '#d0021b'
    },
    {
      value: 3,
      label: '已完成',
      color: '#3d1ab7'
    }
  ]
})

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
    },
    {
      type: 'status',
      label: '状态',
      dataField: 'status',
      elementProps: {
        width: '120px'
      },
      extendProps: {
        options: optionsMap['status']
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
        address: '上海市普陀区金沙江路 1518 弄',
        status: 1
      },
      {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        status: 2
      },
      {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        status: 3
      },
      {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1520 弄',
        status: 4
      }
    ]
    table.loading = false
  }, 200)
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: [] as Array<any>,
  columns,
  pagination: false
})

getList()
</script>

<style lang="scss" scoped>
.common-table-container {
  background: white;
  padding: 12px;
}
</style>
