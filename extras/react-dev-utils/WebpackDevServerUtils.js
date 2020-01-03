/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'

const chalk = require('chalk')
const clearConsole = require('./clearConsole')
const formatWebpackMessages = require('./formatWebpackMessages')

// determine if I/O unit is a terminal.
const isInteractive = process.stdout.isTTY

function printInstructions(appName, urls, useYarn) {
    console.log()
    console.log(`You can now view ${chalk.bold(appName)} in the browser.`)
    console.log()

    if (urls.lanUrlForTerminal) {
        console.log(
            `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
        )
        console.log(
            `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
        )
    } else {
        console.log(`  ${urls.localUrlForTerminal}`)
    }

    console.log()
    console.log('Note that the development build is not optimized.')
    console.log(
        `To create a production build, use ` +
            `${chalk.cyan(`${useYarn ? 'yarn' : 'npm run'} build`)}.`
    )
    console.log()
}

function createCompiler({ config, webpack, appName, urls, useYarn }) {
    // "Compiler" is a low-level interface to Webpack.
    // It lets us listen to some events and provide our own custom messages.
    let compiler
    try {
        compiler = webpack(config)
    } catch (err) {
        console.log(chalk.red('Failed to compile.'))
        console.log()
        console.log(err.message || err)
        console.log()
        process.exit(1)
    }

    // "invalid" event fires when you have changed a file, and Webpack is
    // recompiling a bundle. WebpackDevServer takes care to pause serving the
    // bundle, so if you refresh, it'll wait instead of serving the old one.
    // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
    compiler.hooks.invalid.tap('invalid', () => {
        if (isInteractive) {
            clearConsole()
        }
        console.log('Compiling...')
    })

    let isFirstCompile = true
    // "done" event fires when Webpack has finished recompiling the bundle.
    // Whether or not you have warnings or errors, you will get this event.
    compiler.hooks.done.tap('done', async stats => {
        if (isInteractive) {
            clearConsole()
        }

        // We have switched off the default Webpack output in WebpackDevServer
        // options so we are going to "massage" the warnings and errors and present
        // them in a readable focused way.
        // We only construct the warnings and errors for speed:
        // https://github.com/facebook/create-react-app/issues/4492#issuecomment-421959548
        const statsData = stats.toJson({
            all: false,
            warnings: true,
            errors: true
        })

        const messages = formatWebpackMessages(statsData)
        const isSuccessful =
            !messages.errors.length && !messages.warnings.length
        if (isSuccessful) {
            console.log(chalk.green('Compiled successfully!'))
        }
        if (isSuccessful && (isInteractive || isFirstCompile)) {
            printInstructions(appName, urls, useYarn)
        }
        isFirstCompile = false

        // If errors exist, only show errors.
        if (messages.errors.length) {
            // Only keep the first error. Others are often indicative
            // of the same problem, but confuse the reader with noise.
            if (messages.errors.length > 1) {
                messages.errors.length = 1
            }
            console.log(chalk.red('Failed to compile.\n'))
            console.log(messages.errors.join('\n\n'))
            return
        }

        // Show warnings if no errors were found.
        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'))
            console.log(messages.warnings.join('\n\n'))

            // Teach some ESLint tricks.
            console.log(
                '\nSearch for the ' +
                    chalk.underline(chalk.yellow('keywords')) +
                    ' to learn more about each warning.'
            )
            console.log(
                'To ignore, add ' +
                    chalk.cyan('// eslint-disable-next-line') +
                    ' to the line before.\n'
            )
        }
    })

    return compiler
}

module.exports = {
    createCompiler
}
