/**
 * @date 2017-03-16 09:47:59
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');
const { port, publicPath, dist, src, entry, filename, externals } = pkg.config;

module.exports = {
  entry,

  output: {
    path: path.join(__dirname, dist),
    publicPath,
    filename: `${filename}.js`,
    libraryTarget: 'umd',
    library: 'Validator',
  },

  plugins: [
    new ExtractTextPlugin({
      filename: `${filename}.css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.join(__dirname, src),
      },
      {
        test: /\.css$/,
        // exclude: /src/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=images/`,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=fonts/`,
      },
      // 폰트를 제대로 불러오지 못함.
      // {
      //   test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10000, // 10kb
      //     },
      //   },
      // },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, src),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-3'],
          plugins: [
            'lodash',
            'dynamic-import-webpack',
            'transform-object-assign',
          ],
        },
      },
    ],
  },

  resolve: {
    alias: {
      _components: path.resolve(__dirname, `${src}/components`),
    },
  },
};

