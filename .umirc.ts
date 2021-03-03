import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: true,
  },
  dva: {
    immer: true,
    hmr: false,
  },
  routes: routes,
  fastRefresh: {},
});
