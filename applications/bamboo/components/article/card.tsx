import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'

import { IArticleCardProps } from './index'

import { Image } from '../image'
import { Typography } from '../typography'
import { IPlanetTheme } from '../theme'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    root: {
        width: '100%'
    },
    bottom: {
        marginTop: theme.spacing(1.5)
    }
}))

export const ArticleCard: FC<IArticleCardProps> = props => {
    const { title, desc, link, image } = props
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Image src={image} ratio="16x9" alt="article cover" />
            <div className={classes.bottom}>
                <Typography variant="title">{title}</Typography>
                <Typography variant="description">{desc}</Typography>
            </div>
        </div>
    )
}
