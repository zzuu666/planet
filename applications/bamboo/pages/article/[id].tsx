import React, { FC } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import { createUseStyles } from 'react-jss'
import marked from 'marked'

import { IPlanetTheme } from '../../components/theme'

import { Header } from '../../components/header'
import { Layout } from '../../components/layout'
import { ArticleHeader, Markdown } from '../../components/article'

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    gap: {
        marginBottom: `${theme.spacing(2)}px`,
        marginTop: `${theme.spacing(2)}px`
    }
}))

interface IProps {
    article: bamboo.api.Article
}

const ArticlePage: NextPage<IProps> = props => {
    const { article } = props
    const classes = useStyles()

    return (
        <Layout title={article.title}>
            <ArticleHeader {...article} />
            <Markdown content={article.content} />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { params } = context

    const res = await fetch('http://localhost:3000/graphql', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query {
                article(id: ${params.id}) {
                    id
                    title
                    desc
                    image
                    content
                    updatedAt
                    createdAt
                }
            }
            `
        })
    })
    const json = await res.json()

    return {
        props: {
            article: json.data.article
        }
    }
}

export default ArticlePage
