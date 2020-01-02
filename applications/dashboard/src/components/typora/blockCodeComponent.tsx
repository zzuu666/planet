import React, { FC, useRef, useEffect } from 'react'
import { ContentBlock, EditorBlock } from 'draft-js'
import * as monaco from 'monaco-editor'

interface IProps {
    block: ContentBlock
}

export const BlockCodeComponent: FC<IProps> = props => {
    const { block } = props
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        monaco.editor.create(containerRef.current!, {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        })
    }, [])

    return <div style={{height: 400}} ref={containerRef} />
}
