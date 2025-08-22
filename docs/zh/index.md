---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Castor Antdv
  text: 企业级中后台组件库
  tagline: 基于 Vue3，二次封装 Ant Design Vue，聚焦查询-表格-表单高频场景
  image:
    src: /logo.png
    alt: Castor Antdv
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/quickstart
    - theme: alt
      text: 组件文档
      link: /zh/components/common-table

features:
  - title: 通用表格 CaCommonTable
    details: 内置序号、状态、操作列、链接、图片等常见单元格类型，配置即用，支持自定义渲染与命令扩展。
  - title: 通用查询 CaCommonQuery
    details: 以字段配置快速拼装查询区域，支持禁用/可见性校验与表单项扩展，默认包含重置与查询能力。
  - title: 通用表单 CaCommonForm
    details: 支持表单分组、校验、底部操作区与自定义组件注入，覆盖中后台高频表单场景。
  - title: 类型安全
    details: 提供完整的 TypeScript 类型（Field/Model/Command/Sorter 等），开发时即获智能提示与约束。
  - title: 国际化支持
    details: 可对接项目内 t 函数，支持 zh-CN/en-US 多语言，并提供运行时 locale 切换能力。
  - title: 生态兼容
    details: 基于 Ant Design Vue 4.x 与 Vue3，样式与交互统一，支持全局或按需注册以及 Vite/VitePress 工程体系。
---
