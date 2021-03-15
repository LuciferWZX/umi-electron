const DEV_ADDRESS = 'http://127.0.0.1:3000';
export default {
  dev: {
    '/api/': {
      target: `${DEV_ADDRESS}`,
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
};
