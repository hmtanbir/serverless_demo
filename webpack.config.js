var path = require('path');
const slsw = require('serverless-webpack');
// Helper functions
var ROOT = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}


module.exports = {
    target: 'node',
    mode: "development",
    entry: slsw.lib.entries,
    devtool: 'source-map',
    externals: ["aws-sdk", "vertx"],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    },
    module: {
        rules: [
            {
                test: /\.ts$/, use: 'ts-loader'
            },
            {
                test: /\.js$/,
                loader: "shebang-loader"
            }
        ]
    }
};
