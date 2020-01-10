import React, { FC } from 'react'
import { EditorState, ContentBlock } from 'draft-js'

interface IProps {
    block: ContentBlock
}

export const BlockImageComponent: FC<IProps> = props => {
    const { block } = props

    const src = block.getData().get('src')

    return <img src={src} alt="img" />
}
