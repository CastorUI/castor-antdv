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

## 项目结构

组件库包含以下核心组件：

- CaCommonTable: 通用表格组件
- CaCommonForm: 通用表单组件
- CaCommonQuery: 通用查询组件
