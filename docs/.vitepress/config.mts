import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Castor3',
  description: ' Vue3 Component Library Based On AntDedignVue',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: '/favicon.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/basic-component1' },
      { text: 'VitePress示例', link: '/examples/markdown' },
    ],
    sidebar: {
      '/guide': [
        {
          text: '指南',
          items: [
            { text: '组件库介绍', link: '/guide/index' },
            { text: '快速开始', link: '/guide/quickstart' },
          ],
        },
      ],
      '/components': [
        {
          text: '通用基础组件',
          items: [
            { text: '基础组件 1', link: '/components/basic-component1' },
            { text: '基础组件 2', link: '/components/basic-component2' }
          ]
        },
        {
          text: '通用业务组件',
          items: [
            { text: '通用组件 1', link: '/components/common-component1' },
            { text: '通用组件 2', link: '/components/common-component2' }
          ]
        },
        {
          text: '高级业务组件',
          items: [
            { text: '高级组件 1', link: '/components/pro-component1' },
            { text: '高级组件 2', link: '/components/pro-component2' }
          ]
        }
      ],
      '/examples': [
        {
          text: 'VitePress示例',
          items: [
            { text: 'Markdown', link: '/examples/markdown' },
            { text: 'Runtime API', link: '/examples/api' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://gitlab.polarwin.cn/components/vue3-antdv-components',
      },
    ],
  },
});
