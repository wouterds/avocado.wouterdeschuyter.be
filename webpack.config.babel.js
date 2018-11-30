import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default (env, { mode }) => {
  const isProduction = mode === 'production';

  const config = {
    entry: {
      bundle: './src/index.js',
    },
    output: {
      path: path.resolve('./public'),
      filename: isProduction ? '[hash:7].[name].js' : '[name].js',
    },
    resolve: {
      extensions: ['.js'],
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./resources'),
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
                importLoaders: true,
                localIdentName: isProduction ? '[hash:7]' : '[name]-[local]-[hash:4]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
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
              },
            },
          ],
        },
        {
          test: /\.(gif|jpe?g|png)$/,
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[hash:7].[ext]',
          },
        },
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
          loader: 'file-loader',
          options: {
            name: '[hash:7].[ext]',
          },
        },
      ],
    },
    plugins: [
      new FlowBabelWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './resources/index.html',
        filename: path.resolve('./public/index.html'),
      }),
    ],
  };

  // Production specific
  if (isProduction) {
    config.plugins.push(new FaviconsWebpackPlugin({
      logo: './resources/images/avocado.png',
      prefix: '[hash:7]-',
    }));

    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve('./public/report.html'),
      openAnalyzer: false,
    }));
  }

  // Development specific
  if (!isProduction) {
    config.devtool = 'source-map';
  }

  return config;
};
