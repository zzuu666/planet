import React, { FC } from 'react'
import { EditorState, ContentBlock } from 'draft-js'

interface IProps {
    block: ContentBlock
}

export const BlockImageComponent: FC<IProps> = props => {
    const { block } = props

    const url = block.getData().get('url')

    return <img src={url} alt="img" />
}
