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
        width: '120px'
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
      dataField: 'address'
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
        id: 20,
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
    table.loading = false
  }, 200)
}

const handleSelectChange = (selectedRowKeys: Array<string | number>, selectedRows: Array<any>) => {
  console.log('handleSelectChange', selectedRowKeys, selectedRows)
  if (table.elementProps && table.elementProps.rowSelection) {
    table.elementProps.rowSelection.selectedRowKeys = selectedRowKeys
  }
}

const handleStar = () => {
  console.log('handleStar', table.elementProps?.rowSelection?.selectedRowKeys)
}

const handleUnstar = () => {
  console.log('handleUnstar', table.elementProps?.rowSelection?.selectedRowKeys)
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: [] as Array<any>,
  columns,
  pagination: false,
  customCommands: [
    {
      text: '关注',
      command: 'handleStar',
      disableValidator: () => table.elementProps?.rowSelection?.selectedRowKeys?.length === 0
    },
    {
      text: '取消关注',
      command: 'handleUnstar',
      disableValidator: () => table.elementProps?.rowSelection?.selectedRowKeys?.length === 0
    }
  ],
  elementProps: {
    rowSelection: {
      selectedRowKeys: [],
      onChange: handleSelectChange,
      fixed: 'left',
      columnWidth: '60px'
    }
  },
  emitRegister: {
    handleStar,
    handleUnstar
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
