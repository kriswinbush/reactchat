const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

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
            {test: /\.scss$/, exclude: /(node_modules)/, loaders:['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    plugins: [HtmlWebpackPluginConfig],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};