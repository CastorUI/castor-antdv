<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" />
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
        width: '200px'
      }
    },
    {
      type: 'commands',
      label: '操作',
      dataField: 'commands',
      elementProps: {
        fixed: 'right',
        width: '100px'
      },
      extendProps: {
        commands: [
          {
            text: '编辑',
            command: 'handleEdit',
            disableValidator: ({ row }) => row.id === 2,
            visibleValidator: ({ row }) => row.id >= 2
          },
          {
            text: '删除',
            command: 'handleDelete',
            elementProps: {
              danger: true
            }
          }
        ]
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
    table.loading = false
    return table.dataSource
  }, 200)
}

const handleEdit = ({ index, row }) => {
  console.log('handleEdit', index, row)
}
const handleDelete = ({ index, row }) => {
  console.log('handleDelete', index, row)
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: [] as Array<any>,
  columns,
  pagination: false,
  emitRegister: {
    handleEdit,
    handleDelete
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
