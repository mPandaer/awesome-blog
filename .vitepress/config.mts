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
      { text: 'Blog', link: '/blog' }
    ],

    sidebar: [...getDirectoryStructure("blog")],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer' }
    ],
    outline: {
      label:"Outline",
      level:"deep"
    }
  }
})
