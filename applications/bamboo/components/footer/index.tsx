import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'

import { Grid } from '../grid'
import { IPlanetTheme } from '../theme'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.gray[200]}`,
        padding: `${theme.spacing(4)}px 0`
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 'bold'
    },
    row: {
        textAlign: 'center'
    }
}))

export const Footer: FC = props => {
    const classes = useStyles()

    return (
        <Grid className={classes.root}>
            <Grid item xs={12} className={classes.row}>
                <span className={classes.text}>京ICP备18059692号</span>
            </Grid>
        </Grid>
    )
}
