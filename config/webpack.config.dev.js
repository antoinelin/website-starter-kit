const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const path = require('path')
const getClientEnvironment = require('./env')

const config = require('./config')

const publicPath = ''
const publicUrl = ''
const env = getClientEnvironment(publicUrl)

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    require.resolve('./polyfills'),
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    `${config.path.srcDir}/scripts/app.js`,
  ],
  output: {
    path: config.path.buildDir,
    pathinfo: true,
    filename: 'static/js/app.bundle.js',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.pug', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.twig$/,
        use: 'twig-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: config.path.modulesDir,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: { limit: 10000, mimetype: 'application/font-woff', name: 'static/fonts/[name]/[name].[ext]' },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: { limit: 10000, mimetype: 'application/font-woff', name: 'static/fonts/[name]/[name].[ext]' },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: { limit: 10000, mimetype: 'application/octet-stream', name: 'static/fonts/[name]/[name].[ext]' },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
        query: { name: 'static/fonts/[name]/[name].[ext]' },
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.twig'),
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(config.path.modulesDir),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
