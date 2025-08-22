---
title: 介绍
---

# Castor Antdv 是什么？

基于 Ant Design Vue 二次封装的 Vue3 业务组件库，聚焦中后台场景的「查询-表格-表单」高频需求，提供即拿即用的通用能力：

- CaCommonTable：通用表格，内置序号、状态、操作列、链接、图片等常见单元格类型
- CaCommonQuery：通用查询，快速拼装查询区域，内置重置/查询等命令
- CaCommonForm：通用表单，支持分组、校验、底部操作区、自定义组件注入

配套 TypeScript 类型、国际化能力与最小样式，帮助你更快落地标准化列表、表单页。

## 特性

- 开箱即用：全局安装即注册三大通用组件
- 强类型：完整导出 Field/Model/Command 等类型
- 可扩展：支持自定义组件、自定义命令、插槽扩展
- i18n：可对接项目内多语言 t 函数，内置 locale 切换（zh-CN / en-US）

## 依赖与兼容

- Vue: 3.x
- Ant Design Vue: 4.x（建议同时引入 `ant-design-vue/dist/reset.css`）

## 快速上手

先查看快速开始以完成安装与基础用法：

- 快速开始 → /guide/quickstart

## 组件一览

- 通用表格 → /components/common-table
- 通用查询 → /components/common-query
- 通用表单 → /components/common-form

## 类型与工具

通过包直接导入类型与工具：

```ts
import type {
  CommonTable,
  CommonForm,
  CommonQuery,
  TableField,
  QueryField,
  FormField,
  CommonCommand,
  CommonSorter
} from '@castor-ui/castor-antdv'
```

更多示例请查看各组件文档与演示。
