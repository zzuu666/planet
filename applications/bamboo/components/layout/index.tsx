import React, { FC } from 'react'
import Head from 'next/head'

interface IProps {
    title?: string
}

export const Layout: FC<IProps> = props => {
    const { title, children } = props

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    )
}

Layout.defaultProps = {
    title: '走走游游大魔王'
}
