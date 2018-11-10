import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === 'production';

  let config = {
    entry: {
      bundle: [
        path.resolve(__dirname, './src/client.js'),
      ],
    },
    output: {
      path: path.resolve(__dirname, './build/static'),
      filename: '[name].[hash:7].js',
      publicPath: '/static/',
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
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader?modules&importLoaders&localIdentName=[hash:base64:7]',
            'postcss-loader',
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
          test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
          loader: 'file-loader?name=fonts/[hash:7].[ext]',
        },
      ],
    },
    plugins: [
      new FlowBabelWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, './build/index.html'),
        template: path.resolve(__dirname, './resources/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[hash:7].css',
      }),
    ],
  };

  if (isProduction) {
    config.plugins.push(new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './resources/images/avocado.png'),
      prefix: '[hash:7]-',
    }));

    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, './build/report.html'),
      openAnalyzer: false,
    }));
  }

  return config;
};
