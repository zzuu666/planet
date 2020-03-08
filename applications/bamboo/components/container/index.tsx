import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { IPlanetTheme } from '../theme'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    container: {
        margin: '0 auto',
        padding: `0 ${theme.spacing(2)}px`,

        [theme.breakpoionts.up('sm')]: {
            maxWidth: '480px'
        },
        [theme.breakpoionts.up('md')]: {
            maxWidth: '768px'
        },
        [theme.breakpoionts.up('lg')]: {
            maxWidth: '1024px'
        }
    }
}))

export const Container: FC = props => {
    const { children } = props
    const classes = useStyles()

    return <div className={classes.container}>{children}</div>
}
