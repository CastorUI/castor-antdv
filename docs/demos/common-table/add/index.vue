<template>
  <div class="common-table-container">
    <ca-common-table
      v-bind="{
        ...table,
        emitRegister
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonTable, TableField } from '#/castor-antdv'

const columns = computed<Array<TableField>>(() => {
  return [
    {
      type: 'index',
      label: '序号',
      dataField: 'index',
      elementProps: {
        width: '60px '
      }
    },
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

const onTableChange = (newPagination, filters, sorter, extra) => {
  console.log('onTableChange', newPagination, filters, sorter, extra)
  ;(table.pagination || {}).current = newPagination.current
  ;(table.pagination || {}).pageSize = newPagination.pageSize
  getList()
}

const table = reactive<CommonTable>({
  loading: false,
  title: '测试表格',
  dataSource: [] as Array<any>,
  columns,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  addCommand: {
    text: '新建',
    command: 'handleAdd',
    visibleValidator: () => true,
    disableValidator: () => {}
  },
  elementProps: {
    onChange: onTableChange
  }
})

const getList = () => {
  console.log('getList', table.pagination || {})
  table.loading = true
  setTimeout(() => {
    const baseIndex =
      (((table.pagination || {}).current || 1) - 1) * ((table.pagination || {}).pageSize || 10)
    table.dataSource = [
      {
        id: baseIndex + 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: baseIndex + 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: baseIndex + 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        id: baseIndex + 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        id: baseIndex + 5,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: baseIndex + 6,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: baseIndex + 7,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        id: baseIndex + 8,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        id: baseIndex + 9,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: baseIndex + 10,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }
    ]
    table.loading = false
  }, 200)
}

const handleAdd = () => {
  console.log('handleAdd')
}

const emitRegister = {
  handleAdd
}

getList()
</script>

<style lang="scss" scoped>
.common-table-container {
  background: white;
  padding: 12px;
}
</style>
