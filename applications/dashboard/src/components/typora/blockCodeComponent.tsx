import React, { FC, useRef, useEffect } from 'react'
import { ContentBlock, EditorBlock } from 'draft-js'
import * as monaco from 'monaco-editor'

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
    const perRef = useRef<HTMLPreElement>(null)

    useEffect(() => {
        monaco.editor.colorizeElement(perRef.current)
    }, [])

    return (
        <pre ref={perRef} data-lang={lang}>
            {code}
        </pre>
    )
}
