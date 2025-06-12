<template>
  <div class="common-form-container">
    <ca-common-form ref="formRef" v-bind="form" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { CommonForm, FormField } from '#/castor-antd'

const optionsMap = reactive({
  sex: [
    {
      value: 1,
      label: '男'
    },
    {
      value: 2,
      label: '女'
    }
  ],
  equipment: [
    {
      value: 'double',
      label: '双压记录仪',
      disabled: false
    },
    {
      value: 'remote',
      label: '压力远传处理仪',
      disabled: false
    }
  ]
})

const fields = computed<Array<FormField>>(() => {
  return [
    {
      type: 'groupTitle',
      label: '',
      dataField: '',
      columnSpan: 2,
      extendProps: {
        groupTitle: '1、基本信息',
        groupCommands: [
          {
            text: '取消关注',
            command: 'handleUnStar'
          },
          {
            text: '关注',
            command: 'handleStar'
          }
        ],
        formItemStyle: {
          marginTop: '6px'
        }
      }
    },
    {
      type: 'text',
      label: '编号',
      dataField: 'code',
      columnSpan: 1
    },
    {
      type: 'default',
      label: '姓名',
      dataField: 'name',
      columnSpan: 1
    },
    {
      type: 'select',
      label: '用户性别',
      dataField: 'sex',
      columnSpan: 1,
      elementProps: {
        options: optionsMap['sex']
      }
    },
    {
      type: 'inputNumber',
      label: '年龄',
      dataField: 'age',
      columnSpan: 1
    },
    {
      type: 'date',
      label: '年份',
      dataField: 'userYear',
      columnSpan: 1,
      elementProps: {
        picker: 'year',
        valueFormat: 'YYYY'
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
      }
    },
    {
      type: 'switch',
      label: '是否启用',
      dataField: 'userEnabled',
      columnSpan: 1
    },
    {
      type: 'textArea',
      label: '地址',
      dataField: 'address',
      columnSpan: 2
    },
    {
      type: 'space',
      label: '',
      dataField: '',
      columnSpan: 2
    },
    {
      type: 'groupTitle',
      label: '',
      dataField: '',
      columnSpan: 2,
      extendProps: {
        groupTitle: '2、其它信息',
        formItemStyle: {
          marginTop: '6px'
        }
      }
    },
    {
      type: 'checkboxGroup',
      label: '主打产品',
      dataField: 'equipment',
      columnSpan: 1,
      elementProps: {
        options: optionsMap['equipment']
      }
    },
    {
      type: 'radioGroup',
      label: '用户性别',
      dataField: 'sex',
      columnSpan: 1,
      elementProps: {
        options: optionsMap['sex']
      }
    }
  ]
})

const handleStar = () => {
  console.log('handleStar', form.model)
}

const handleUnStar = () => {
  console.log('handleUnStar', form.model)
}

const handleSave = ({ command }) => {
  console.log('handleSave', form.model)
  command.loading = true
  setTimeout(() => (command.loading = false), 2000)
}

const handleCancel = ({ command }) => {
  console.log('handleCancel')
  command.loading = true
  setTimeout(() => (command.loading = false), 2000)
}

const form = reactive<CommonForm>({
  loading: false,
  operateType: 'add',
  model: {
    code: '1001',
    name: '张三',
    sex: null,
    age: 18,
    userYear: '',
    userMonth: '',
    userDate: '',
    userEnabled: true,
    address: '长江路555号',
    equipment: []
  },
  fields,
  commands: [
    {
      text: '取消',
      command: 'handleCancel'
    },
    {
      text: '确定',
      command: 'handleSave',
      loading: false,
      elementProps: {
        type: 'primary',
        style: {
          fontWeight: 'bold'
        }
      }
    }
  ],
  elementProps: {
    labelCol: { style: { width: '80px' } },
    wrapperCol: { style: { flex: 1 } },
    style: {
      // margin: '0 12px 12px 12px',
      'margin-bottom': '12px'
    }
  },
  extendProps: {
    contentStyle: { overflow: 'auto', flex: 1, marginTop: '12px' }
  },
  emitRegister: {
    handleStar,
    handleUnStar,
    handleSave,
    handleCancel
  }
})
</script>

<style lang="scss" scoped>
.common-form-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
