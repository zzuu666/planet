import React, { FC } from 'react'
import { NextPage, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'
import { createUseStyles } from 'react-jss'
import { IPlanetTheme } from '../components/theme'

import { Layout } from '../components/layout'
import { Profile } from '../components/profile'
import { Header } from '../components/header'
import { Grid } from '../components/grid'
import {
    ArticleCard,
    ArticleBig,
    ArticleHorizontal
} from '../components/article'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    gap: {
        marginBottom: `${theme.spacing(2)}px`,
        marginTop: `${theme.spacing(2)}px`
    }
}))

interface IProps {
    articles: bamboo.api.Article[]
}

const IndexPage: NextPage<IProps> = props => {
    const { articles } = props
    const classes = useStyles()

    return (
        <Layout>
            <Header />
            <Profile
                avatar={
                    'https://zzuucos-1255357441.file.myqcloud.com/blog-images/1583594036382-SU1HXzYy.jpeg'
                }
                main="走走游游"
                desc="其实我是一名产品经理"
            />
            <ArticleBig className={classes.gap} {...articles[0]} link={''} />
            <Grid spacing={2}>
                <Grid item md={4}>
                    <ArticleCard
                        title={articles[0].title}
                        desc={articles[0].desc}
                        image={articles[0].image}
                        link={''}
                    />
                </Grid>
                <Grid item md={4}>
                    <ArticleCard
                        title={articles[1].title}
                        desc={articles[1].desc}
                        image={articles[1].image}
                        link={''}
                    />
                </Grid>
                <Grid item md={4}>
                    <ArticleCard
                        title={articles[2].title}
                        desc={articles[2].desc}
                        image={articles[2].image}
                        link={''}
                    />
                </Grid>
            </Grid>
            <Grid>
                <Grid item md={8}>
                    {articles.map(article => (
                        <ArticleHorizontal
                            key={article.id}
                            title={article.title}
                            desc={article.desc}
                            link={''}
                            image={article.image}
                        />
                    ))}
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </Layout>
    )
}

IndexPage.getInitialProps = async (context: NextPageContext) => {
    const res = await fetch('http://localhost:3000/graphql', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query {
                articles {
                    id
                    title
                    desc
                    image
                }
            }
            `
        })
    })
    const json = await res.json()

    return {
        articles: json.data.articles
    }
}

export default IndexPage
