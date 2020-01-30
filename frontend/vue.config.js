module.exports = {
	assetsDir: 'static',
	devServer: {
		open: true,
		port: 8080,
		proxy: {
			'/test_api': {
				target: 'https://www.missevan.com/sound',  // target host
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/test_api': ''
				}
			},
		}
	} 
};