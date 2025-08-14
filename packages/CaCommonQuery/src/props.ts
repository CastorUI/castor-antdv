import { CommonCommand, QueryField } from '#/castor-antd'
import { PropType } from 'vue'

export const commonQueryProps = {
  formId: {
    type: String,
    default: 'queryForm'
  },
  loading: {
    type: Boolean,
    default: false
  },
  model: {
    type: Object,
    default: () => {}
  },
  fields: {
    type: Array as PropType<QueryField[]>,
    default: () => []
  },
  commands: {
    type: Array as PropType<CommonCommand[]>,
    default: () => []
  },
  downloadOpt: {
    type: Object,
    default: () => {}
  },
  dynamicFieldsPosition: {
    type: String,
    default: 'end'
  },
  maxFieldWidth: {
    type: Number,
    default: 230
  },
  commandsFloat: {
    type: String,
    default: 'right'
  },
  defaultCheckedKeys: {
    type: Array as PropType<number[] | string[]>,
    default: () => []
  },
  emitRegister: {
    type: Object,
    default: () => {}
  },
  elementProps: {
    type: Object,
    default: () => {}
  }
}
