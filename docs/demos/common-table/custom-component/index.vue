<template>
  <div class="common-table-container">
    <ca-common-table v-bind="table" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, shallowRef } from 'vue'
import CustomInfo from './components/CustomInfo.vue'
import { CommonTable, TableField } from '#/castor-antdv'

const columns = computed<Array<TableField>>(() => {
  return [
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
      dataField: 'address',
      elementProps: {
        width: '240px'
      }
    },
    {
      type: 'custom',
      label: '备注',
      dataField: 'custom-info',
      elementProps: {
        width: '200px'
      },
      extendProps: {
        componentKey: 'customInfo'
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
  }, 200)
}

const table = reactive<CommonTable>({
  loading: false,
  dataSource: [] as Array<any>,
  columns,
  pagination: false,
  customComponents: {
    customInfo: shallowRef(CustomInfo)
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
