import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

/**
 * TODO: standard margin
 */
const useStyles = makeStyles({
    root: {
        position: 'relative',
        margin: `48px 0`,
        border: 'none',
        display: 'flex',
        justifyContent: 'space-around',

        '&:before': {
            content: '"· · ·"',
            fontSize: 24,
            letterSpacing: 8
        }
    }
})

export const BlockBreakComponent: FC = props => {
    const classes = useStyles()

    return <hr className={classes.root} />
}
