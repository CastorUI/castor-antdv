<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonTable, TableField } from '#/castor-antd'

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
      type: 'image',
      label: '图片',
      dataField: 'status',
      elementProps: {
        width: '120px'
      },
      extendProps: {
        subElementProps: {
          width: 50,
          height: 50,
          src: 'https://q2.itc.cn/q_70/images03/20241013/47ff05019e93455abd85cd47612fbf7b.jpeg'
        }
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
