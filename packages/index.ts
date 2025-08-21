import { App, Plugin } from 'vue'
import CaCommonTable from './CaCommonTable'
import CaCommonQuery from './CaCommonQuery'
import CaCommonForm from './CaCommonForm'
import {
  provideI18n,
  setCastorAntdvLocale
} from './hooks/useI18n'
import { CastorAntdvI18nOptions } from '../types/castor-antdv'

// 导出类型定义
export type {
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
} from '../types/castor-antdv'

// 存储组件列表
const components = { CaCommonTable, CaCommonQuery, CaCommonForm }

/**
 * 定义 install 方法，接收 Vue 作为参数。
 * 如果使用 use 注册插件，则所有的组件都将被注册
 */
export type CastorAntdvOptions = { i18n?: CastorAntdvI18nOptions }

const install = (app: App, options?: CastorAntdvOptions) => {
  // 遍历注册全局组件
  Object.keys(components).forEach((componentName) => {
    app.component(componentName, components[componentName])
  })

  // i18n 接入（可选）
  if (options?.i18n) {
    const { t, locale } = options.i18n
    if (t) provideI18n(app, t)
    if (locale) setCastorAntdvLocale(locale)
  }
}

const CastorAntdv: Plugin<[CastorAntdvOptions?]> & typeof components & { version: string } = {
  version: '1.0.0',
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}

export default CastorAntdv
export { CaCommonTable, CaCommonQuery, CaCommonForm }
export * from './hooks/useI18n'
