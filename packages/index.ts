import { App } from 'vue'
import CaCommonTable from './CaCommonTable'
import CaCommonQuery from './CaCommonQuery'
import CaCommonForm from './CaCommonForm'

// 存储组件列表
const components = { CaCommonTable, CaCommonQuery, CaCommonForm }

/**
 * 定义 install 方法，接收 Vue 作为参数。
 * 如果使用 use 注册插件，则所有的组件都将被注册
 */
const install = (app: App) => {
  // 遍历注册全局组件
  Object.keys(components).forEach((componentName) => {
    app.component(componentName, components[componentName])
  })
}

export default {
  version: '1.0.0',
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}
