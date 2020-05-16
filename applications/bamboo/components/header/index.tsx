import React, { FC } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import LightIcon from '@planet-ui/icons/build/Brightness7'
import DarkIcon from '@planet-ui/icons/build/Brightness4'
import Link from 'next/link'

import { IPlanetTheme } from '../theme'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
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
    },
    icon: {
        width: 28,
        height: 28,
        color: theme.palette.primary.main
    }
}))

export const Header: FC = props => {
    const classes = useStyles()
    const theme = useTheme() as IPlanetTheme

    return (
        <div className={classes.root}>
            <Link href={`/`}>
                <div className={classes.right}>
                    <img src="/logo.svg" alt="site icon" width="32" />
                    大白话家
                </div>
            </Link>
            <div>
                {theme.theme === 'light' ? (
                    <DarkIcon
                        className={classes.icon}
                        viewBox="0 0 24 24"
                        fill={theme.palette.primary.main}
                    ></DarkIcon>
                ) : (
                    <LightIcon
                        className={classes.icon}
                        viewBox="0 0 24 24"
                    ></LightIcon>
                )}
            </div>
        </div>
    )
}
