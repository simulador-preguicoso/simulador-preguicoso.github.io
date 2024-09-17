const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/*.html', to: '[name][ext]' },
                { from: 'src/assets/*', to: 'assets/[name][ext]' },
                { from: 'src/styles/*', to: 'styles/[name][ext]' }
            ]
        })
    ]
};