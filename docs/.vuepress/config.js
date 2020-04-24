module.exports = {
  title: "bx-chart",
  description: "用于快速搭建数据可视化页面",
  base: "/bx-chart/doc/",
  head: [
    ["link",{ rel: "icon",href: "/assets/logo.png" }]
  ],
  themeConfig: {
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    // repo: "https://github.com/zpfz/vuepress-creator",
    editLinks: false,
  },
};