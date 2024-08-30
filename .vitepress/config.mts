import { defineConfig } from 'vitepress'
import { getDirectoryStructure } from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/",
  title: "Pandaer杂货铺",
  description: "不一样的技术杂货",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '每月计划', link: '/monthly' }
    ],

    sidebar: [...getDirectoryStructure("blog")
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
      // // {
      // //   text: '技术模版',
      // //   items: [
      // //     { text: 'Template', link: '/template' },
      // //   ]
      // // },
      // // {
      // //   text: '每月计划',
      // //   items: [
      // //     { text: '每月计划', link: '/monthly' },
      // //   ]
      // // }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer' }
    ]
  }
})
