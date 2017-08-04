const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DIST_DIR = path.resolve('dist')

const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin({
    logo:'./src/assets/dococ.png',
    prefix:"assets/",
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      favicons: true,
      firefox: true,
      windows: true
    },
    background: '#26333b',
    inject: true
});
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    { from: 'src/assets/manifest.json', to: 'assets/manifest.json' },
]);

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
const WorkboxPluginConfig = new workboxPlugin({
  globDirectory: './dist/',
  globPattern: ["**\/*.{html,js,css}"],
  swDest: './dist/sw.js'
});
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index.min.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /(node_modules)/,loader: 'babel-loader'},
            {test: /\.jsx$/, exclude: /(node_modules)/,loader: 'babel-loader'},
            {test: /\.scss$/, exclude: /(node_modules)/, loaders:['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(jpg|png|svg)$/,exclude: /(node_modules)/,loader: 'file-loader', options: {name: './[hash].[ext]'}}
        ]
    },
    plugins: [FaviconsWebpackPluginConfig, HtmlWebpackPluginConfig, CopyWebpackPluginConfig, WorkboxPluginConfig],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
    }
};
