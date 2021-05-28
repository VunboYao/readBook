module.exports = {
  title: 'Hello VunboYao',
  description: 'Just Do IT',
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
  },
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: false,
    sidebar: [
      {
        title: 'C语言',
        children: ['C/C.md'],
      },
      {
        title: 'JavaScript',
        collapse: false,
        children: [
          {
            title: '面试系列',
            children: ['JS/000-面试系列', 'JS/01-JS数据类型', 'JS/02-JS深浅拷贝'],
          },
        ],
      },
      {
        title: '高级程序设计3',
        children: [
          {
            title: '面向对象',
            children: ['JS/001-面向对象.md'],
          },
          {
            title: 'Bom&Dom',
            children: ['JS/002-Bom&Dom.md'],
          },
          {
            title: '事件',
            children: ['JS/003-事件.md'],
          },
          {
            title: 'H5相关',
            children: ['JS/004-H5相关.md'],
          },
          {
            title: 'JSON&AJAX',
            children: ['JS/005-JSON&AJAX.md'],
          },
          {
            title: 'ES6',
            children: ['JS/006-ES6.md'],
          },
          {
            title: 'Promise',
            children: ['JS/007-Promise.md'],
          },
          {
            title: 'Array',
            children: ['JS/008-Array.md'],
          },
        ],
      },
      {
        title: 'React',
        children: ['React/React.md'],
      },
      {
        title: 'Git',
        children: ['Git/newGit.md'],
      },
      {
        title: '小程序',
        children: ['miniApp/miniApp.md'],
      },
      {
        title: 'Vue',
        children: ['Vue/Vue-Router.md'],
      },
      {
        title: 'WebPack',
        children: ['WebPack/webpack.md'],
      },
    ],
  },
}
