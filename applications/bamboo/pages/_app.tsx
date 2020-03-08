import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'react-jss'
import { createTheme } from '../components/theme/index'

import '../components/styles/baseline.css'

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
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
