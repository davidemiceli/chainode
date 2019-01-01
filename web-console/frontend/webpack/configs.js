'use strict';
/*
  Webpack main configurations
*/

// Requirements
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// Main webpack config
module.exports = (entryPoint, rootPath, outputPath) => ({
  entry: {
    "app": ['babel-polyfill', entryPoint]
  },
  output: {
    path: outputPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader, options: {minimize: true}},
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                useRelativePath: true,
                outputPath: '/'
            }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: require('./configs/vueLoaderConfig')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'] // Transpile the ES6 to es2015 standard
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',  // Resolving the vue var for standalone build
      '@': rootPath,
      'jQuery': 'jquery/dist/jquery.min.js'
    }
  },
  plugins: require('./plugins')(rootPath, outputPath), // set the defined plugins
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      // minSize: 10000,
      // maxSize: 300000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors',
          minChunks: 1,
          enforce: true
        }
      }
    }
  }
});
