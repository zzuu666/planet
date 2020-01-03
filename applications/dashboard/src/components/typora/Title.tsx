import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
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
