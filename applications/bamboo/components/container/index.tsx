import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { IPlanetTheme } from '../theme'
import { Header } from '../header'
import { Footer } from '../footer'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    container: {
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}px`,

        [theme.breakpoints.up('sm')]: {
            maxWidth: '480px'
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '768px'
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1024px'
        }
    }
}))

export const Container: FC = props => {
    const { children } = props
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    )
}
