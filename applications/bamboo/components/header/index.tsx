import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
    }
}))

export const Header: FC = props => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div>左侧布局</div>
            <div>右侧</div>
        </div>
    )
}
