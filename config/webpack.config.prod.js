const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const path = require('path')

const config = require('./config')

module.exports = {
  devtool: 'source-map',
  entry: [
    `${config.path.srcDir}/scripts/app.js`,
    require.resolve('./polyfills'),
  ],
  output: {
    path: config.path.buildDir,
    filename: 'static/js/app.bundle-[chunkhash:8].js',
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
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: config.path.modulesDir,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1', 'sass-loader', 'postcss-loader',
          ],
          publicPath: config.path.buildDir,
        }),
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
  devServer: {
    contentBase: config.path.buildDir,
    compress: true,
    stats: 'errors-only',
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: path.resolve(__dirname, '../src/index.pug'),
    }),
    new ExtractTextPlugin({ filename: 'static/css/app.bundle-[contenthash:8].css', disable: false }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new WatchMissingNodeModulesPlugin(config.path.modulesDir),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
