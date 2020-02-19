import React, { FC } from 'react'
import { NextPage, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'
import { Layout } from '../components/layout'

interface IProps {
    title: string
}

const IndexPage: NextPage<IProps> = props => {
    const { title } = props

    return (
        <Layout>
            <p>{title}</p>
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
                article(id: 53) {
                    title
                }
            }
            `
        })
    })
    const json = await res.json()

    console.log(json)

    return json.data.article
}

export default IndexPage
