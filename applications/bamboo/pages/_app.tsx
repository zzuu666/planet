import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'react-jss'
import { createTheme } from '../components/theme/index'
import { GapGlobalStyles } from '../components/styles/gap'

import '../components/styles/baseline.css'
import '../components/styles/markdown.css'
import 'prismjs/themes/prism-tomorrow.css'

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const style = document.getElementById('server-side-styles')

        if (style) {
            style.parentNode.removeChild(style)
        }
    }, [])
    const theme = createTheme()

    return (
        <ThemeProvider theme={theme}>
            <GapGlobalStyles />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
