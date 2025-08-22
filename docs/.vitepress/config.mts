import { DefaultTheme, defineConfig } from 'vitepress';
import {
  componentPreview,
  containerPreview,
} from '@vitepress-demo-preview/plugin';

const nav: DefaultTheme.NavItem[] = [
  { text: '文档', link: '/guide/' },
  { text: '组件', link: '/components/common-table' },
];
const sidebar: DefaultTheme.Sidebar = {
  '/guide': [
    {
      text: '文档',
      items: [
        { text: '组件库介绍', link: '/guide/index' },
        { text: '快速开始', link: '/guide/quickstart' },
      ],
    },
  ],
  '/components': [
    {
      text: '组件列表',
      items: [
        { text: '通用表格', link: '/components/common-table' },
        { text: '通用查询', link: '/components/common-query' },
        { text: '通用表单', link: '/components/common-form' },
      ],
    }
  ]
};

export default defineConfig({
  title: 'CastorAntdv',
  description: ' Vue3 Component Library Based On AntDedignVue',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lang: 'zh-CN',
  base: '/castor-antdv-help/',
  outDir: './../castor-antdv-help',
  lastUpdated: true,
  themeConfig: {
    i18nRouting: true,
    logo: '/favicon.ico',
    lastUpdatedText: '上次更新',
    returnToTopLabel: '回到顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      level: 'deep', // 右侧大纲标题层级
      label: '页面导航', // 右侧大纲标题文本配置
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://gitlab.polarwin.cn/components/vue3-antdv-components',
      },
    ],
    nav,
    sidebar,
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview);
      md.use(containerPreview);
    },
  },
});
