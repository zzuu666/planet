'use strict'

const fs = require('fs')
const paths = require('./paths')
const ignoredFiles = require('../../extras/react-dev-utils/ignoredFiles')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || '0.0.0.0'

module.exports = (proxy, allowedHost) => {
    return {
        compress: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        // By default WebpackDevServer serves physical files from current directory
        // in addition to all the virtual build products that it serves from memory.
        // This is confusing because those files won’t automatically be available in
        // production build folder unless we copy them. However, copying the whole
        // project directory is dangerous because we may expose sensitive files.
        // Instead, we establish a convention that only files in `public` directory
        // get served. Our build script will copy `public` into the `build` folder.
        // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
        // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
        // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
        // Note that we only recommend to use `public` folder as an escape hatch
        // for files like `favicon.ico`, `manifest.json`, and libraries that are
        // for some reason broken when imported through Webpack. If you just want to
        // use an image, put it in `src` and `import` it from JavaScript instead.
        contentBase: paths.appPublic,
        // By default files from `contentBase` will not trigger a page reload.
        watchContentBase: true,
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the Webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
        hot: true,
        // WebpackDevServer is noisy by default so we emit custom message instead
        // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
        quiet: true,
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebook/create-react-app/issues/293
        // src/node_modules is not ignored to support absolute imports
        // https://github.com/facebook/create-react-app/issues/1065
        watchOptions: {
            ignored: ignoredFiles(paths.appSrc)
        },
        // Enable HTTPS if the HTTPS environment variable is set to 'true'
        https: protocol === 'https',
        host,
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebook/create-react-app/issues/387.
            disableDotRule: true
        },
        public: allowedHost,
        proxy
    }
}
