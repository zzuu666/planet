import React, { FC } from 'react'

import { IArticleHeader } from './index'
import { Typography } from '../typography'
import { Grid } from '../grid'
import { Image } from '../image'

export const ArticleHeader: FC<IArticleHeader> = props => {
    const { title, desc, image, updatedAt, createdAt } = props

    return (
        <Grid spacing={2}>
            <Grid item md={6}>
                <Typography variant="h2">{title}</Typography>
                <Typography variant="description">{desc}</Typography>
                <Typography variant="description">
                    创作于 {createdAt}
                </Typography>
                <Typography variant="description">
                    更新于 {updatedAt}
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Image ratio="16x9" src={image} alt="article cover" />
            </Grid>
        </Grid>
    )
}
