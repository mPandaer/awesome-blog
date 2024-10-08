import { defineConfig } from 'vitepress'
import { getDirectoryStructure } from './sidebar.mjs'
import { navBar } from './navbar.mjs'
import { writeAllFileItems2BlogIndex } from './blog.mjs'

// 将全部文章写入到 blog/index.md
writeAllFileItems2BlogIndex()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/",
  title: "Pandaer杂货铺",
  description: "不一样的技术杂货",
  themeConfig: {

    siteTitle:"Pandaer 杂货铺",
    // https://vitepress.dev/reference/default-theme-config
    nav: navBar,

    sidebar: getDirectoryStructure("blog"),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer/awesome-blog' }
    ],
    outline: {
      label:"大纲",
      level:[1,6]
    },
    logo: ""
  }
})
