---
title: Introduction
---

# What is Castor Antdv?

A Vue 3 business component library based on Ant Design Vue, focusing on the high-frequency "Query-Table-Form" pattern for admin apps. It provides ready-to-use capabilities:

- CaCommonTable: common table with index/status/link/image/commands cells
- CaCommonQuery: common search area with built-in actions
- CaCommonForm: common form with grouping, validation and footer actions

It ships TypeScript types, i18n, and minimal styles to speed up standardized pages.

## Features

- Out-of-the-box: register three components via a single plugin
- Strong typing: complete types for fields/models/commands
- Extensible: custom components/commands and slots
- i18n: connect your t() and switch locale (zh-CN / en-US)

## Dependencies

- Vue: 3.x
- Ant Design Vue: 4.x

## Quick Start

Head to Quick Start to install and try:

- Quick Start → /guide/quickstart

## Components

- Common Table → /components/common-table
- Common Query → /components/common-query
- Common Form → /components/common-form

## Types

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
