import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import theme from 'vitepress/dist/client/theme-default/index.js'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import './custom.css'
import { App } from 'vue'

// 创建一个空的组件库实现，用于构建时
const EmptyCastorAntdv = {
  install: (app: App) => {},
}

// 定义默认导出
const themeConfig = {
  ...theme,
  enhanceApp({ app }) {
    app.use(Antd)
    // 默认使用空实现
    let CastorAntdv = EmptyCastorAntdv
    
    // 在客户端环境下动态导入组件库
    if (typeof window !== 'undefined') {
      // 使用IIFE立即执行异步函数
      ;(async () => {
        try {
          // 优先尝试从源码目录导入（开发环境）
          try {
            CastorAntdv = (await import('./../../../packages/index')).default
            console.log('成功从源码加载组件库')
          } catch (err) {
            // 如果从源码导入失败，尝试从构建目录导入（构建环境）
            CastorAntdv = (await import('./../../../es/index')).default
            console.log('成功从构建目录加载组件库')
          }
        } catch (err) {
          console.warn('无法加载组件库，使用空实现替代', err)
        }
        
        // 注册组件库
        app.use(CastorAntdv)
      })()
    }
    
    app.component('demo-preview', AntDesignContainer)
  }
}

export default themeConfig
