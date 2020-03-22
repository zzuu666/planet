import React, { FC } from 'react'
import marked from 'marked'
import Prism from 'prismjs'

// @ts-ignore
Prism.manual = true

marked.setOptions({
    highlight(code, language) {
        const lang = language || 'markup'
        return Prism.highlight(code, Prism.languages[lang], lang)
    }
})

interface IMarkdownProps {
    content: string
}

export const Markdown: FC<IMarkdownProps> = props => {
    const { content } = props
    const md = marked(content)

    return (
        <div className="planet-md" dangerouslySetInnerHTML={{ __html: md }} />
    )
}
