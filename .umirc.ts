import { defineConfig } from 'umi';
import routes from './config/routes';

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
  dva: {
    immer: true,
    hmr: false,
  },
  routes: routes,
  fastRefresh: {},
});
