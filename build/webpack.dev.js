const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        smart_assistant: './src/main.js'
    },
    output: {
        filename: '[name].js',
        libraryExport: 'default',
        library: 'SmartAssistant',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [],
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
        }),
        new CopyWebpackPlugin(
            [{ from: './public/index.html', to: './', force: true }],
            { copyUnmodified: true }
        )
    ],
};