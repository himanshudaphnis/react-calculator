const path = require('path');

const config = {
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: path.join(__dirname, './public/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
            }
        ]
    }
};

module.exports = config;