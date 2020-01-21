import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    root: {
        display: 'flex'
    }
})

export const Title: FC = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div>保留区域</div>
            <div>
                <input />
            </div>
        </div>
    )
}
