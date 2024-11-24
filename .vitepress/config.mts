import { defineConfig } from 'vitepress'
import { genSideBarConfig } from './sidebar.mjs'
import { genNavBarConfig } from './navbar.mjs'
import { writeAllFileItems2BlogIndex } from './blog.mjs'

// 将全部文章写入到 blog/all.md
writeAllFileItems2BlogIndex()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/",
  title: "Pandaer杂货铺",
  description: "不一样的技术杂货",
  head:[
    [
      'link',
      {
          rel: 'icon',
          href: '/favicon.ico',
      },
  ]
  ],
  themeConfig: {

    siteTitle:"Pandaer 杂货铺",
    // https://vitepress.dev/reference/default-theme-config
    nav: genNavBarConfig("blog"),

    sidebar: genSideBarConfig("blog"),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer/awesome-blog' }
    ],
    outline: {
      label:"大纲",
      level:[2,5]
    },
    logo: ""
  }
})
