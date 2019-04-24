var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const extractSass = new ExtractTextPlugin({
//   filename: "[name].css",
//   disable: process.env.NODE_ENV === "development"
// });

module.exports = {
  entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
    publicPath: '/dist/', // 通过devServer访问路径
    filename: 'build.js' // 打包后的文件名
  },
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
            // use: extractSass.extract({
            //     use: [{
            //         loader: "css-loader"
            //     }, {
            //         loader: "sass-loader"
            //     }],
            //     fallback: "style-loader"
            // })

        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }
    ]
  },
  devServer: {//webpack-dev-server配置
    historyApiFallback: true,//不跳转
    noInfo: true,
    inline: true//实时刷新
  },
  performance: {
      hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // extractSass,
    // new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
              warnings: false
          }
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true
      })
  ])
}