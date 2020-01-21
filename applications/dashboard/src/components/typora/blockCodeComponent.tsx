import React, { FC } from 'react'
import { ContentBlock, EditorBlock } from 'draft-js'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

interface IProps {
    block: ContentBlock
}

interface IBlockData {
    lang: 'javascript'
    code: string
}

export const BlockCodeComponent: FC<IProps> = props => {
    const { block } = props
    const lang = block.getData().get('lang')
    const code = block.getData().get('code')

    return (
        <pre data-line={1}>
            <code className={`language-${lang}`}>{code}</code>
        </pre>
    )
}
