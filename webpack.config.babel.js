import { resolve } from 'path'
import { DllReferencePlugin, HotModuleReplacementPlugin } from 'webpack'
import manifest from './_serve/dll.manifest.json'

const PORT = 7000
const entry = resolve('./src')
const contentBase = resolve('_serve')
const nodeModules = resolve('node_modules')

export default {
  entry,
  output: {
    path: contentBase,
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    contentBase,
    // watchContentBase: true,
    publicPath: '/',
    overlay: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true
  },
  devtool: `source-map`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [nodeModules],
        use: [`babel-loader?cacheDirectory`]
      }
    ]
  },
  plugins: [
    new DllReferencePlugin({ manifest }),
    new HotModuleReplacementPlugin()
  ]
}
