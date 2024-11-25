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

const getList = () => {
  console.log('getList', table.pagination)
  table.loading = true
  setTimeout(() => {
    const baseIndex =
      (((table.pagination || {}).current || 1) - 1) * ((table.pagination || {}).pageSize || 10)
    let tableList: Array<Object> = []
    for (let i = 1; i <= ((table.pagination || {}).pageSize || 10); i++) {
      tableList.push({
        id: baseIndex + i,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      })
    }
    table.dataSource = tableList
    table.loading = false
  }, 200)
}

const handleChange = (newPagination, filters, sorter, extra) => {
  console.log('handleChange', newPagination, filters, sorter, extra)
  ;(table.pagination || {}).current = newPagination.current
  ;(table.pagination || {}).pageSize = newPagination.pageSize
  getList()
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: [] as Array<any>,
  columns,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 500,
    showTotal: (total: number) => `共${total}条`,
    showSizeChanger: true,
    showQuickJumper: true
  },
  elementProps: {
    onChange: handleChange
  }
})

getList()
</script>

<style lang="scss" scoped>
.common-table-container {
  background: white;
  padding: 12px;
}
</style>
