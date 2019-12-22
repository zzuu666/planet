'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err
})

const fs = require('fs')
const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const configFactory = require('../../config/react/webpack.config')
const createDevServerConfig = require('../../config/react/webpackDevServer.config')
const paths = require('../../config/react/paths')

const checkRequiredFiles = require('../../extras/react-dev-utils/checkRequiredFiles')

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

const config = configFactory('development')
const compiler = webpack(config)

const serverConfig = createDevServerConfig(undefined, undefined)
const devServer = new WebpackDevServer(compiler, serverConfig)

devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
        return console.log(err)
    }

    // We used to support resolving modules according to `NODE_PATH`.
    // This now has been deprecated in favor of jsconfig/tsconfig.json
    // This lets you use absolute paths in imports inside large monorepos:
    if (process.env.NODE_PATH) {
        console.log(
            chalk.yellow(
                'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
            )
        )
        console.log()
    }

    console.log(chalk.cyan('Starting the development server...\n'))
})
