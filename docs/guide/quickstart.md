---
title: 快速开始
---

# 快速开始

本页将引导你完成安装、样式引入、全局/按需用法、i18n 接入，以及三个核心组件的最小示例。

## 安装

```bash
npm i @castor-ui/castor-antdv ant-design-vue
```

> 组件库依赖 Ant Design Vue 4.x 与 Vue3。

## 基础使用

全局注册后即可直接在模板中使用三大组件：

```ts
// main.ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import CastorAntdv from '@castor-ui/castor-antdv'
import '@castor-ui/castor-antdv/style.css'

import App from './App.vue'

const app = createApp(App)
app.use(Antd)
app.use(CastorAntdv)
app.mount('#app')
```

## 按需引入

也可以仅引入需要的组件：

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import { CaCommonTable, CaCommonQuery, CaCommonForm } from '@castor-ui/castor-antdv'
import '@castor-ui/castor-antdv/style.css'

const app = createApp(App)
app.use(Antd)
app.component('CaCommonTable', CaCommonTable)
app.component('CaCommonQuery', CaCommonQuery)
app.component('CaCommonForm', CaCommonForm)
```

## i18n 接入（可选）

组件库支持传入项目内的 t 函数与 locale：

```ts
import { createApp } from 'vue'
import CastorAntdv, { setCastorAntdvLocale, provideI18n } from '@castor-ui/castor-antdv'

// 以 vue-i18n 为例（伪代码）
// const i18n = createI18n({ legacy: false, locale: 'en-US', messages })

createApp(App)
  // .use(i18n)
  .use(CastorAntdv, {
    i18n: {
      // t: i18n.global.t, // 传入你的 t 函数
      locale: 'en-US'      // 可选，默认 zh-CN
    }
  })
  .mount('#app')

// 运行时也可：
// provideI18n(app, i18n.global.t)
// setCastorAntdvLocale('zh-CN')
```

## 最小示例

下面给出三个核心组件的最小可运行示例，类型均来自包内定义，便于获得完整的类型提示。

### 通用表格 CaCommonTable

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { TableField } from '@castor-ui/castor-antdv'

const columns = computed<TableField[]>(() => [
  { type: 'index', label: '#', dataField: '__index__' },
  { type: 'default', label: 'Name', dataField: 'name' },
  { type: 'status', label: 'Status', dataField: 'status', extendProps: { options: [
    { label: 'Enabled', value: true },
    { label: 'Disabled', value: false }
  ]}}
])

const dataSource = [
  { id: 1, name: 'Alice', status: true },
  { id: 2, name: 'Bob', status: false }
]
</script>

<template>
  <CaCommonTable :columns="columns" :data-source="dataSource" :loading="false" title="Users" />
</template>
```

### 通用查询 CaCommonQuery

```vue
<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { QueryField } from '@castor-ui/castor-antdv'

const model = reactive({ keyword: '' })

const fields = computed<QueryField[]>(() => [
  { type: 'default', label: '关键字', dataField: 'keyword', columnSpan: 8 },
])
</script>

<template>
  <CaCommonQuery :model="model" :fields="fields" />
</template>
```

### 通用表单 CaCommonForm

```vue
<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { FormField } from '@castor-ui/castor-antdv'

const model = reactive({ name: '', status: true })

const fields = computed<FormField[]>(() => [
  { type: 'text', label: '名称', dataField: 'name', columnSpan: 12 },
  { type: 'switch', label: '启用', dataField: 'status', columnSpan: 12 },
])
</script>

<template>
  <CaCommonForm title="编辑" operate-type="add" :model="model" :fields="fields" />
</template>
```

## 常见问题

- 样式不生效？请确认已引入 `ant-design-vue/dist/reset.css` 与 `@castor-ui/castor-antdv/style.css`。
- 类型报错？请确认使用的是 Vue3 + TS，且 `node_modules/@castor-ui/castor-antdv/es/types` 能被解析。
- 国际化不生效？若未传入 t 函数，组件将使用内置文案；也可调用 `setCastorAntdvLocale` 切换语言。
