import { defineConfig } from 'umi';
import routes from './config/routes';
import antdTheme from './config/antdTheme';
import proxy from './config/proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  theme: antdTheme,
  dva: {
    immer: true,
    hmr: false,
  },
  routes: routes,
  fastRefresh: {},
  proxy: proxy['dev'],
});
