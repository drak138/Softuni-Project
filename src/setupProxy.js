const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/v8/',
        createProxyMiddleware({
          target: 'https://query1.finance.yahoo.com',
          changeOrigin: true,
        })
      );
};