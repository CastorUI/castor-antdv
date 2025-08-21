import { CommonCommand, FormField } from '#/castor-antdv'
import { PropType } from 'vue'

export const commonFormProps = {
  loading: {
    type: Boolean,
    default: false
  },
  model: {
    type: Object,
    default: () => {}
  },
  fields: {
    type: Array as PropType<FormField[]>,
    default: () => []
  },
  commands: {
    type: Array as PropType<CommonCommand[]>,
    default: () => []
  },
  customCommands: {
    type: Array as PropType<CommonCommand[]>,
    default: () => []
  },
  rowFieldsCount: {
    type: Number,
    default: 2
  },
  rowHeight: {
    type: Number,
    default: 36
  },
  operateType: {
    type: String,
    default: 'add'
  },
  customComponents: {
    type: Object,
    default: () => {}
  },
  elementProps: {
    type: Object,
    default: () => {}
  },
  extendProps: {
    type: Object,
    default: () => {}
  },
  emitRegister: {
    type: Object,
    default: () => {}
  },
  // 自定义组件检验函数名
  customValidators: {
    type: Array,
    default: () => []
  }
}
