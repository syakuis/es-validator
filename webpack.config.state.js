/**
 * @date 2017-03-16 09:47:59
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./webpack.config');

module.exports = merge(config, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});