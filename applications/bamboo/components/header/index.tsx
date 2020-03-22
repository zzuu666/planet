import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { Image } from '../image'
import { Grid } from '../grid'

const useStyles = createUseStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F0A1A8'
    }
}))

export const Header: FC = props => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.right}>
                <img src="/logo.svg" alt="site icon" width="32" />
                大白话家
            </div>
            <div>其他</div>
        </div>
    )
}
