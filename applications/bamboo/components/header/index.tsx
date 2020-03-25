import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import Link from 'next/link'

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
        color: '#ef7c81'
    }
}))

export const Header: FC = props => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Link href={`/`}>
                <div className={classes.right}>
                    <img src="/logo.svg" alt="site icon" width="32" />
                    大白话家
                </div>
            </Link>
            <div>其他</div>
        </div>
    )
}
