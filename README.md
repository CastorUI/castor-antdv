# castor-antdv

## 项目简介

基于 antdv 的组件库，用于快速开发中后台系统。

## 安装

```bash
npm install @castor-ui/castor-antdv --save
```

## 使用

### 全局引入

```js
import { createApp } from 'vue'
import CastorAntdv from '@castor-ui/castor-antdv'
import App from './App.vue'

const app = createApp(App)
app.use(CastorAntdv)
app.mount('#app')
```

### 国际化（i18n）

组件库内置双语文案并支持外部 i18n 接入。

- 支持语言：`zh-CN`、`en-US`
- 默认语言：`zh-CN`

使用方式：在安装插件时传入 i18n 配置

```ts
import { createApp } from 'vue'
import CastorAntdv from '@castor-ui/castor-antdv'
// 若使用 vue-i18n
// import { createI18n } from 'vue-i18n'

// const i18n = createI18n({ legacy: false, locale: 'en-US', messages: { /* 你的多语消息 */ } })

const app = createApp(App)
// app.use(i18n)
app.use(CastorAntdv, {
	i18n: {
		// 传入你的 t 函数（例如：i18n.global.t）
		// t: i18n.global.t,
		// 初始语言（可选，不传则为 zh-CN）
		locale: 'en-US'
	}
})
app.mount('#app')
```



## 项目结构

组件库包含以下核心组件：

- CaCommonTable: 通用表格组件
- CaCommonForm: 通用表单组件
- CaCommonQuery: 通用查询组件
