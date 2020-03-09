import React, { FC } from 'react'
import { NextPage, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'
import { Layout } from '../components/layout'
import { Profile } from '../components/profile'
import { Header } from '../components/header'

interface IProps {
    articles: bamboo.api.Article[]
}

const IndexPage: NextPage<IProps> = props => {
    const { articles } = props

    return (
        <Layout>
            <Header />
            <Profile
                avatar={
                    'https://zzuucos-1255357441.file.myqcloud.com/blog-images/1583594036382-SU1HXzYy.jpeg'
                }
                main="走走游游的大白话家"
                desc="其实我是一名产品经理"
            />
            <div>
                {articles.map(article => (
                    <div>{article.title}</div>
                ))}
            </div>
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
