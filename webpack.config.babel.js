import path from 'path';
import { LoaderOptionsPlugin, DefinePlugin, optimize } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const production = process.env.NODE_ENV === 'production';

/*global __dirname: true*/

let config = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(__dirname, './src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: production ? 'app.[hash:7].js' : 'app.js',
    sourceMapFilename: 'app.js.map',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./resources'),
      path.resolve('./public'),
      path.resolve('./src'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: production
                ? '[hash:base64:7]'
                : '[name]-[local]-[hash:base64:7]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !production,
              plugins: (loader) => [
                require('postcss-pseudoelements')(),
                require('postcss-import')({
                  path: 'src/styles',
                }),
                require('postcss-mixins')(),
                require('postcss-preset-env')({
                  features: {
                    'custom-properties': {
                      preserve: false,
                    },
                  },
                }),
                require('postcss-nested')(),
                require('postcss-hexrgba')(),
                require('postcss-calc')(),
                require('postcss-custom-media')(),
                require('cssnano')(),
              ],
            }
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
          name: '[hash:7].[ext]',
        },
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        options: {
          publicPath: '/',
          name: '[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './public/index.html'),
      template: path.resolve(__dirname, './resources/index.html'),
    }),
    new LoaderOptionsPlugin({
      minimize: production,
      sourceMap: !production,
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development',
      ),
    }),
  ],
};

// Production specific
if (production) {
  config.plugins.push(new optimize.UglifyJsPlugin());

  config.plugins.push(new FaviconsWebpackPlugin({
    logo: path.resolve(__dirname, './resources/images/avocado.png'),
    prefix: '[hash:7]-',
  }));
}

// Development specific
if (!production) {
  config.devtool = 'source-map';

  config.devServer = {
    contentBase: path.resolve(__dirname, './public'),
    port: 8080,
    historyApiFallback: true,
  };

  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: path.resolve(__dirname, './public/report.html'),
    openAnalyzer: false,
  }));
}


export default config;
