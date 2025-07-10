import { ComputedRef } from 'vue'
import { Rule } from 'ant-design-vue/es/form/interface'
import { FormProps } from 'ant-design-vue/es/form/Form'
import { FormItemProps } from 'ant-design-vue/es/form/FormItem'
import { TableProps } from 'ant-design-vue/es/table'
import { TablePaginationConfig } from 'ant-design-vue/es/table'
import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import { validateOptions } from 'ant-design-vue/es/form/useForm'

export interface CommonCommand {
  text: string
  command: string
  loading?: boolean
  disableValidator?: Function
  visibleValidator?: Function
  elementProps?: ButtonProps & { style?: Object }
  canKeyDown?: boolean
}

export interface SelectItem {
  label: string
  value: string | number
  disabled?: boolean
  color?: string
}

/** 通用表格字段 */
export interface TableField {
  type: 'index' | 'link' | 'custom' | 'commands' | 'status' | 'image' | 'default'
  label: string
  dataField: string
  elementProps?: Object
  extendProps?: {
    options?: Array<SelectItem>
    commands?: Array<CommonCommand>
    linkCommand?: string
    componentKey?: string,
    subElementProps?: object
  }
}

/** 通用查询字段 */
export interface QueryField {
  type: 'select' | 'date' | 'dateRange' | 'time' | 'timeRange' | 'default'
  label: string
  dataField: string
  columnSpan: number
  disableValidator?: Function
  visibleValidator?: Function
  elementProps?: Object
  extendProps?: {
    formItemProps?: FormItemProps
    formItemStyle?: Object
  }
}

/** 通用表单字段 */
export interface FormField {
  type:
  | 'text'
  | 'select'
  | 'date'
  | 'dateRange'
  | 'time'
  | 'timeRange'
  | 'textArea'
  | 'groupTitle'
  | 'checkboxGroup'
  | 'radioGroup'
  | 'custom'
  | 'upload'
  | 'status'
  | 'inputNumber'
  | 'autocomplete'
  | 'switch'
  | 'space'
  | 'image'
  | 'default'
  label: string
  dataField: string
  columnSpan: number
  rules?: Array<Rule>
  disableValidator?: Function
  visibleValidator?: Function
  elementProps?: Object
  extendProps?: FormFieldExtendProps
}

/** 通用表单-扩展属性 */
export interface FormExtendProps {
  /** 内容样式 */
  contentStyle?: Object
  /** 底部样式 */
  footerStyle?: Object
}

/** 通用表单字段-扩展属性 */
export interface FormFieldExtendProps {
  /** FormItem属性 */
  formItemProps?: FormItemProps
  /** FormItem样式 */
  formItemStyle?: Object
  /** 自定义组件名 */
  componentKey?: string
  /** 分组标题 */
  groupTitle?: string
  /** 分组命令集合 */
  groupCommands?: Array<CommonCommand>
  /** 帮助/提示 */
  tips?: string
  beforeText?: string
  /** 状态字段对应的选项集合 */
  statusOptions?: Array<SelectItem>
  /** 是否显示在底部 */
  showInFooter?: boolean
  /** 分值标题-副标题 */
  subTitle?: string
  /** 图片选项 */
  imageOptions?: {
    width?: string
    height?: string
    radius?: string
    style?: Object
  }
}

/** 通用表单 */
export interface CommonForm {
  loading?: boolean
  visible?: boolean
  title?: string
  rowFieldsCount?: number
  operateType: 'add' | 'view' | 'edit'
  model: any
  fields: ComputedRef<FormField[]>
  commands?: Array<CommonCommand>
  elementProps?: FormProps & { style?: Object }
  extendProps?: FormExtendProps
  emitRegister?: { [key: string]: Function } & {
    validate?: <T = any>(names?: string | string[], option?: validateOptions) => Promise<T>
    clearValidate?: (names?: string | string[]) => void
    resetFields?: (newValues?: { [key: string]: any }) => void
  }
  customComponents?: Object
  // 自定义组件校验函数名
  customValidators?: Array<any>
}

/** 通用表格 */
export interface CommonTable {
  loading: boolean
  title?: string
  dataSource: Array<Object>
  columns: ComputedRef<TableField[]>
  pagination: false | TablePaginationConfig
  sorter?: CommonSorter
  addCommand?: CommonCommand
  elementProps?: TableProps
  emitRegister?: Object
  customComponents?: Object
  customCommands?: Array<CommonCommand>
}

/** 通用查询 */
export interface CommonQuery {
  loading?: boolean
  model: any
  fields: ComputedRef<QueryField[]>
  commands?: Array<CommonCommand>
  elementProps?: FormProps
  emitRegister?: { [key: string]: Function } & {
    resetFields?: (newValues?: { [key: string]: any }) => void
  }
}

export interface CommonSorter {
  sortField: string
  sortOrder: 'ascend' | 'decend'
}
