import { defineConfig } from 'vitepress';

export default defineConfig({
  // ...
  outDir: 'dist',
  themeConfig: {
    repo: 'ziyoung/articles',
    editLinks: true,
    lastUpdated: true,
    nav: [
      {
        text: 'AST CookBook',
        link: '/ast-cookbook/preface',
      },
      {
        text: '文章',
        link: '/article/unicode-javascript',
      },
    ],
    sidebar: {
      '/article/': [
        {
          text: 'Unicode 与 JavaScript',
          link: '/article/unicode-javascript',
        },
        {
          text: '占位',
          link: '/article/placeholder',
        },
      ],
      '/ast-cookbook/': [
        {
          text: '前言',
          link: '/ast-cookbook/preface',
        },
        {
          text: 'jsx',
          link: '/ast-cookbook/jsx',
        },
      ],
    },
  },
});
