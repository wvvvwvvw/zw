import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'yarn',
  copy: [{
    from: 'src/public',
    to: 'dist'
  }],
  title: '紫微斗数',
  links: [{
    rel: 'icon', href: 'www.ico',
  }]
  // base: '/zw/',
  // publicPath: '/zw/'
});
