import React, { FC } from 'react'
import Head from 'next/head'
import { Container } from '../container'

interface IProps {
    title?: string
}

export const Layout: FC<IProps> = props => {
    const { title, children } = props

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" type="image/svg" href="/logo.svg"></link>
            </Head>
            <Container>{children}</Container>
        </>
    )
}

Layout.defaultProps = {
    title: '大白话家'
}
