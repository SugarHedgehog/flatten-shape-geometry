const path = require('path');
const webpack = require('webpack'); // Add this line

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ShapeGeometry',
        libraryTarget: 'var',
    },
    mode: 'development',
    resolve: {
        fallback: {
            "assert": false,
            "process": require.resolve("process/browser")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};