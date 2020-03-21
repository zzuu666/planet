import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'

import { IPlanetTheme } from '../theme'
import { IArticleCardProps } from './index'

import { Grid } from '../grid'
import { Image } from '../image'
import { Typography } from '../typography'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    bottom: {
        marginTop: theme.spacing(1.5)
    }
}))

export const ArticleHorizontal: FC<IArticleCardProps> = props => {
    const { image, title, desc, link } = props
    const classes = useStyles()

    return (
        <Grid className={classes.root} spacing={2}>
            <Grid item md={4}>
                <Image src={image} ratio="16x9" alt="article cover" />
            </Grid>
            <Grid item md={8} direction="column">
                <Typography variant="h4">{title}</Typography>
                <Typography>{desc}</Typography>
            </Grid>
        </Grid>
    )
}
