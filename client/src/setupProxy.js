const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // or whatever path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:5000', // change this to your server URL
      changeOrigin: true,
    })
  );
};