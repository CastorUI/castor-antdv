import { App } from 'vue'
import {
  CommonTable,
  CommonForm,
  CommonQuery,
  TableField,
  QueryField,
  FormField,
  CommonCommand,
  SelectItem,
  FormExtendProps,
  FormFieldExtendProps,
  CommonSorter
} from './castor-antd'

declare const CastorAntdv: {
  version: string
  install: (app: App) => void
}

export {
  CommonTable,
  CommonForm,
  CommonQuery,
  TableField,
  QueryField,
  FormField,
  CommonCommand,
  SelectItem,
  FormExtendProps,
  FormFieldExtendProps,
  CommonSorter
}

export default CastorAntdv
