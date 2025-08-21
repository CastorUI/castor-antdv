// 直接重新导出所有类型定义
export * from './castor-antdv'

// 导出组件相关的类型定义（如果需要）
import { App } from 'vue'
import { CastorAntdvOptions } from './castor-antdv'

declare const CastorAntdv: {
  version: string
  install: (app: App, options?: CastorAntdvOptions) => void
}

export default CastorAntdv
