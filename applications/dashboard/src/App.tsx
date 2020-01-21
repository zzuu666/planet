import React, { FC } from 'react'
import { ThemeProvider } from 'react-jss'
import { HomePage } from './pages/home/index'

export interface ITheme {
    status: {
        danger: string
        normal: string
    }
}

const theme = {
    status: {
        danger: 'orange',
        normal: 'green'
    }
}

export const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <HomePage />
        </ThemeProvider>
    )
}
