<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" :emit-register="emitRegister" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { CommonTable, TableField } from '#/castor-antd'

const columns = computed<Array<TableField>>(() => {
  return [
    {
      type: 'index',
      label: '序号',
      dataField: 'index',
      elementProps: {
        width: '60px'
      }
    },
    {
      type: 'link',
      label: '编号',
      dataField: 'code',
      elementProps: {
        width: '100px',
        align: 'center'
      },
      extendProps: {
        linkCommand: 'handleLink'
      }
    },
    {
      type: 'default',
      label: '姓名',
      dataField: 'name',
      elementProps: {
        width: '80px'
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
        code: '101',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: 2,
        date: '2016-05-04',
        code: '102',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: 3,
        date: '2016-05-01',
        code: '103',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
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

const handleLink = ({ row, index }) => {
  console.log('handleLink', row, index)
}

const emitRegister = {
  handleLink
}
getList()
</script>

<style lang="scss" scoped>
.common-table-container {
  background: white;
  padding: 12px;
}
</style>
