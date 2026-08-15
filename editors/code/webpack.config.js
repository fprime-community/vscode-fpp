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
    // The webview runs under a Content Security Policy that forbids `unsafe-eval`.
    // Webpack's development default (`devtool: 'eval'`) wraps every module in
    // `eval()`, which the CSP rejects. Use a real source map (no eval) instead.
    devtool: 'nosources-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    ...commonConfig,
};

/**@type {import('webpack').Configuration}*/
const stateMachineWebviewConfig = {
    target: 'web',
    entry: './webview-sm/src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'sm-webview.js',
        devtoolModuleFilenameTemplate: "../[resource-path]",
        // Inline all of Mermaid's dynamically-imported diagram chunks into the
        // single `sm-webview.js`. VSCode can resolve split chunks via
        // `localResourceRoots`, but the IntelliJ JCEF host loads the bundle as a
        // lone script with no base directory to resolve sibling chunks against.
        asyncChunks: false,
    },
    optimization: {
        // Keep everything (including vendor code) in the one output file.
        splitChunks: false,
    },
    // Same CSP constraint as the sprotty webview: no `eval` devtool.
    devtool: 'nosources-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    ...commonConfig,
};

module.exports = [
    extensionConfig,
    diagramWebviewConfig,
    stateMachineWebviewConfig
];
