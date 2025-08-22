import { DefaultTheme, defineConfig } from 'vitepress';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

// en-US 导航与侧边栏（默认语言，根路径）
const enNav: DefaultTheme.NavItem[] = [
  { text: 'Docs', link: '/guide/' },
  { text: 'Components', link: '/components/common-table' },
];
const enSidebar: DefaultTheme.Sidebar = {
  '/guide': [
    {
      text: 'Docs',
      items: [
        { text: 'Introduction', link: '/guide/index' },
        { text: 'Quick Start', link: '/guide/quickstart' },
      ],
    },
  ],
  '/components': [
    {
      text: 'Components',
      items: [
        { text: 'Common Table', link: '/components/common-table' },
        { text: 'Common Query', link: '/components/common-query' },
        { text: 'Common Form', link: '/components/common-form' },
      ],
    },
  ],
};

// zh-CN 导航与侧边栏（/zh 前缀）
const zhNav: DefaultTheme.NavItem[] = [
  { text: '文档', link: '/zh/guide/' },
  { text: '组件', link: '/zh/components/common-table' },
];
const zhSidebar: DefaultTheme.Sidebar = {
  '/zh/guide': [
    {
      text: '文档',
      items: [
        { text: '组件库介绍', link: '/zh/guide/index' },
        { text: '快速开始', link: '/zh/guide/quickstart' },
      ],
    },
  ],
  '/zh/components': [
    {
      text: '组件列表',
      items: [
        { text: '通用表格', link: '/zh/components/common-table' },
        { text: '通用查询', link: '/zh/components/common-query' },
        { text: '通用表单', link: '/zh/components/common-form' },
      ],
    },
  ],
};

export default defineConfig({
  title: 'CastorAntdv',
  description: 'Vue3 Component Library Based On Ant Design Vue',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  base: '/castor-antdv-help/',
  outDir: './../castor-antdv-help',
  lastUpdated: true,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        i18nRouting: true,
        logo: '/favicon.ico',
        lastUpdatedText: 'Last updated',
        returnToTopLabel: 'Back to top',
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        outline: {
          level: 'deep',
          label: 'On this page',
        },
        socialLinks: [
          { icon: 'github', link: 'https://gitlab.polarwin.cn/components/vue3-antdv-components' },
        ],
        nav: enNav,
        sidebar: enSidebar,
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
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
          level: 'deep',
          label: '页面导航',
        },
        socialLinks: [
          { icon: 'github', link: 'https://gitlab.polarwin.cn/components/vue3-antdv-components' },
        ],
        nav: zhNav,
        sidebar: zhSidebar,
      },
    },
  },
  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview);
      md.use(containerPreview);
    },
  },
});
