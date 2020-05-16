'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const paths = require('../../config/react/paths')
const webpack = require('webpack')
const configFactory = require('../../config/react/webpack.config')


// Generate webpack's configuration
const config = configFactory('production')

try {
    const compiler = webpack(config)

    // console.log(compiler)

    compiler.run((err, status) => {
        console.log(err, status)
    })
} catch (err) {
    console.log(err)
    process.exit(1)
}

