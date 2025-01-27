import { defineConfig } from 'vitepress'
import { getSideBar } from './sidebar.mjs'
import { getNavBar } from './navbar.mjs'
import taskLists from 'markdown-it-task-lists'



// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "Pandaer杂货铺",
  description: "不一样的技术杂货",
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ]
  ],
  themeConfig: {
    siteTitle: "Pandaer 杂货铺",
    // https://vitepress.dev/reference/default-theme-config
    nav: getNavBar('blog') as any,

    sidebar: getSideBar('blog') as any,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer/awesome-blog' }
    ],
    outline: {
      label: "大纲",
      level: [2, 5]
    },
    logo: ""
  },
  markdown: {
    config: (md) => {
      md.use(taskLists)
    }
  }
})
