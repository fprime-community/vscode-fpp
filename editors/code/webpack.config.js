/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use-strict';

const path = require("path");

/**@type {import('webpack').Configuration}*/
const commonConfig = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
};

/**@type {import('webpack').Configuration}*/
const extensionConfig = {
    target: 'node',
    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
    },
    externals: {
        vscode: "commonjs vscode"
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /node_modules[\\|/](vscode-languageserver-types)/,
                use: { loader: 'umd-compat-loader' },
            },
        ],
    },
};

/**@type {import('webpack').Configuration}*/
const diagramWebviewConfig = {
    target: 'web',
    entry: './webview/src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webview.js',
        devtoolModuleFilenameTemplate: "../[resource-path]",
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    ...commonConfig,
};

module.exports = [
    extensionConfig,
    // diagramWebviewConfig
];
