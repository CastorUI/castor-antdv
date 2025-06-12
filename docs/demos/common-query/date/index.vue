<template>
  <div class="common-query-container">
    <ca-common-query v-bind="query" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonQuery, QueryField } from '#/castor-antd'

const fields = computed<Array<QueryField>>(() => {
  return [
    {
      type: 'default',
      label: '姓名',
      dataField: 'name',
      columnSpan: 1,
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '40px' } },
          wrapperCol: { style: { width: '120px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'default',
      label: '地址',
      dataField: 'address',
      columnSpan: 1,
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '40px' } },
          wrapperCol: { style: { width: '200px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'date',
      label: '年份',
      dataField: 'userYear',
      columnSpan: 1,
      elementProps: {
        picker: 'year',
        valueFormat: 'YYYY'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '40px' } },
          wrapperCol: { style: { width: '86px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'dateRange',
      label: '年份区间',
      dataField: 'userYearRange',
      columnSpan: 1,
      elementProps: {
        picker: 'year',
        valueFormat: 'YYYY'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '66px' } },
          wrapperCol: { style: { width: '150px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'date',
      label: '月份',
      dataField: 'userMonth',
      columnSpan: 1,
      elementProps: {
        picker: 'month',
        valueFormat: 'YYYY-MM'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '40px' } },
          wrapperCol: { style: { width: '106px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'dateRange',
      label: '月份区间',
      dataField: 'userMonthRange',
      columnSpan: 1,
      elementProps: {
        picker: 'month',
        valueFormat: 'YYYY-MM'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '66px' } },
          wrapperCol: { style: { width: '200px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'date',
      label: '日期',
      dataField: 'userDate',
      columnSpan: 1,
      elementProps: {
        picker: 'date',
        valueFormat: 'YYYY-MM-DD'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '40px' } },
          wrapperCol: { style: { width: '126px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'dateRange',
      label: '日期区间',
      dataField: 'userDateRange',
      columnSpan: 1,
      elementProps: {
        picker: 'date',
        valueFormat: 'YYYY-MM-DD'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '66px' } },
          wrapperCol: { style: { width: '246px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'date',
      label: '日期时间',
      dataField: 'userDateTime',
      columnSpan: 1,
      elementProps: {
        showTime: true,
        picker: 'date',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '66px' } },
          wrapperCol: { style: { width: '186px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'dateRange',
      label: '日期时间区间',
      dataField: 'userDateTimeRange',
      columnSpan: 1,
      elementProps: {
        showTime: true,
        picker: 'date',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '100px' } },
          wrapperCol: { style: { width: '360px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'time',
      label: '时间',
      dataField: 'userTime',
      columnSpan: 1,
      elementProps: {
        valueFormat: 'HH:mm:ss'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '40px' } },
          wrapperCol: { style: { width: '106px', marginBottom: '12px' } }
        }
      }
    },
    {
      type: 'timeRange',
      label: '时间区间',
      dataField: 'userTimeRange',
      columnSpan: 1,
      elementProps: {
        valueFormat: 'HH:mm:ss'
      },
      extendProps: {
        formItemProps: {
          labelCol: { style: { width: '66px' } },
          wrapperCol: { style: { width: '200px', marginBottom: '12px' } }
        }
      }
    }
  ]
})

const handleFilter = () => {
  console.log('handleFilter', query.model)
}

const handleReset = () => {
  console.log('handleReset', query.emitRegister)
  query.emitRegister?.resetFields?.()
  handleFilter()
}

const query = reactive<CommonQuery>({
  loading: false,
  model: {
    name: '张三',
    address: '长江路555号',
    userYear: '2022',
    userMonth: '2022-03',
    userDate: '2022-07-11',
    userTime: '13:01:35',
    userDateTime: '2022-07-11 13:05:21',
    userYearRange: ['2021', '2022'],
    userMonthRange: ['2022-07', '2022-09'],
    userDateRange: ['2022-07-22', '2022-07-24'],
    userTimeRange: ['13:18:28', '15:18:28'],
    userDateTimeRange: ['2022-07-22 13:18:28', '2022-07-23 13:18:28']
  },
  fields,
  commands: [
    {
      text: '查询',
      command: 'handleFilter',
      elementProps: {
        type: 'primary'
      },
      canKeyDown: true
    },
    {
      text: '重置',
      command: 'handleReset'
    }
  ],
  elementProps: {
    labelCol: { style: { width: '40px' } },
    wrapperCol: { style: { flex: 1 } }
  },
  emitRegister: {
    handleFilter,
    handleReset
  }
})
</script>
<style lang="scss" scoped>
.common-query-container {
  background: white;
  margin: 12px;
  padding: 12px 12px 0 12px;
}
</style>
