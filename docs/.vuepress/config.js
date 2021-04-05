const fs = require('fs');
const path = require('path');

const getChildren = (dirname) => {
  const dirpath = path.resolve(`docs/${dirname}`);
  const children = fs
    .readdirSync(dirpath)
    .filter(
      item =>
        item.endsWith('.md') && fs.statSync(path.join(dirpath, item)).isFile()
    )
    .map(item => item.replace(/(.md)$/, ''))
    .sort((prev, next) => next.substr(0, next.indexOf('-')) - prev.substr(0, prev.indexOf('-')));
  return children;
}

const DIR_LIST = [
  { title: '书籍笔记', dirname: 'booknotes', children: getChildren('booknotes') },
  { title: '源码学习', dirname: 'codenotes', children: getChildren('codenotes') },
  { title: '日常积累', dirname: 'dailytips', children: getChildren('dailytips') },
  { title: '文章推荐', dirname: 'articles', children: getChildren('articles') },
  { title: '网络框架', dirname: 'websites', children: getChildren('websites') },
];


const getNav = () => {
  return DIR_LIST.map(el => ({ text: el.title, link: `/${el.dirname}/${el.children[0]}.md` }));
}

const getSideBar = () => {
  const sidebar = {};
  DIR_LIST.forEach(el => {
    sidebar[`/${el.dirname}/`] = [{title: el.title, children: el.children}];
  });
  return sidebar;
}


module.exports = {
  title: 'Hello yuanfang VuePress blog',
  description: 'Just do it!! better late than never~~', // meta 中的描述文字，意义不大，SEO用
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
      // 增加一个自定义的 favicon(网页标签的图标)
      // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
      // 即 docs/.vuepress/public/img/geass-bg.ico
      ['link', { rel: 'icon', href: '/img/lufei.ico' }], 
  ],
  base: '/vpblog/', // 这是部署到github相关的配置
  markdown: {
      lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: getNav(),
    sidebar: getSideBar(),
    lastUpdated: '上次更新',
    repo: 'https://github.com/lanluohaisi/lanluohaisi.github.io/vpblog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    sidebarDepth: 3
  }
}