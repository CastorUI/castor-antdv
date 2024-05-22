import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CastorAntdv",
  description: " Vue3 Component Library Based On AntDedignVue",
  head: [
    [
      'link',{ rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  themeConfig: {
    logo: '/favicon.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://gitlab.polarwin.cn/components/vue3-antdv-components' }
    ]
  }
})
