import React, { FC } from 'react'
import { NextPage, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'
import { Layout } from '../components/layout'
import { Profile } from '../components/profile'

interface IProps {
    title: string
}

const IndexPage: NextPage<IProps> = props => {
    const { title } = props

    return (
        <Layout>
            <Profile
                avatar={
                    'https://zzuucos-1255357441.file.myqcloud.com/blog-images/1583594036382-SU1HXzYy.jpeg'
                }
                main="走走游游的大白话家"
                desc="其实我是一名产品经理"
            />
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
                article(id: 1) {
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
