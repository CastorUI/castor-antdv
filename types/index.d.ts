// 直接重新导出所有类型定义
export * from './castor-antd'

// 导出组件相关的类型定义（如果需要）
import { App } from 'vue'

declare const CastorAntdv: {
  version: string
  install: (app: App) => void
}

export default CastorAntdv
