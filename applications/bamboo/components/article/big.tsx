import React, { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { IArticleCardProps } from './index'

import { Grid } from '../grid'
import { Image } from '../image'
import { Typography } from '../typography'

export const ArticleBig: FC<IArticleCardProps> = props => {
    const { image, title, desc, className, id } = props

    return (
        <Grid className={className} spacing={3}>
            <Grid item xs={8}>
                <Link href={`/article/${id}`}>
                    <Image src={image} ratio="16x9" alt="article cover" />
                </Link>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h2" gutter={2}>
                    {title}
                </Typography>
                <Typography variant="description" color="secondary">
                    {desc}
                </Typography>
            </Grid>
        </Grid>
    )
}
