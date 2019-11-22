var ExtractText = require('extract-text-webpack-plugin');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

  var scssConfig = {
    use: [
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'compressed'
        }
      }
    ]
  };

  module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    mode: debug ? 'development' : 'production',
    entry: './assets/src/index.js',
    output: {
      path: __dirname + '/assets/dist/',
      filename: 'blocks.display.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        
      ]
    }
  };