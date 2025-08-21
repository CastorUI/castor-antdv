<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonSorter, CommonTable, TableField } from '#/castor-antdv'

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
        width: '100px',
        sorter: true
      }
    },
    {
      type: 'default',
      label: '姓名',
      dataField: 'name',
      elementProps: {
        width: '100px',
        sorter: true
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
    table.dataSource = [
      {
        id: baseIndex + 1,
        date: '2016-05-02',
        name: '赵小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: baseIndex + 2,
        date: '2016-05-04',
        name: '钱小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: baseIndex + 3,
        date: '2016-05-01',
        name: '孙小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        id: baseIndex + 4,
        date: '2016-05-03',
        name: '李小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        id: baseIndex + 5,
        date: '2016-05-02',
        name: '周小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: baseIndex + 6,
        date: '2016-05-04',
        name: '钱小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: baseIndex + 7,
        date: '2016-05-01',
        name: '郑小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        id: baseIndex + 8,
        date: '2016-05-03',
        name: '冯小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        id: baseIndex + 9,
        date: '2016-05-02',
        name: '陈小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: baseIndex + 10,
        date: '2016-05-04',
        name: '褚小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }
    ]
    // 模拟后排序
    const sortField = (table.sorter || {}).sortField
    if (sortField) {
      if ((table.sorter || {}).sortOrder === 'ascend') {
        table.dataSource.sort((a, b) => {
          if (a[sortField] < b[sortField]) {
            return -1
          } else if (a[sortField] > b[sortField]) {
            return 1
          } else {
            return 0
          }
        })
      } else {
        table.dataSource.sort((a, b) => {
          if (a[sortField] < b[sortField]) {
            return 1
          } else if (a[sortField] > b[sortField]) {
            return -1
          } else {
            return 0
          }
        })
      }
    }
    table.loading = false
  }, 200)
}

const handleChange = (newPagination, filters, sorter, extra) => {
  console.log('handleChange', newPagination, filters, sorter, extra)
  ;(table.pagination || {}).current = newPagination.current
  ;(table.pagination || {}).pageSize = newPagination.pageSize
  if (sorter.field) {
    ;((table.sorter || {}) as CommonSorter).sortField = sorter.field
    ;((table.sorter || {}) as CommonSorter).sortOrder = sorter.order
  }
  getList()
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: [] as Array<any>,
  columns,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: false
  },
  sorter: {
    sortField: '',
    sortOrder: 'decend'
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
