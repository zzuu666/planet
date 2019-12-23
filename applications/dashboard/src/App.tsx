import React, { FC } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { HomePage } from './pages/home/index'

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
