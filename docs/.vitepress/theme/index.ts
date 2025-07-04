import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import theme from 'vitepress/dist/client/theme-default/index.js'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import './custom.css'

import Castor3UI from './../../../packages/index'

export default {
  ...theme,
  enhanceApp({ app }) {
    app.use(Antd)
    console.log('Castor3UI', Castor3UI)
    app.use(Castor3UI)
    app.component('demo-preview', AntDesignContainer)
  }
}
