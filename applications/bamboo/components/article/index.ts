export { ArticleCard } from './card'
export { ArticleBig } from './big'
export { ArticleHorizontal } from './horizontal'
export { ArticleHeader } from './header'
export { Markdown } from './markdown'

export interface IArticleHeader {
    title: string
    desc: string
    image: string
    createdAt: string
    updatedAt: string
}

export interface IArticleCardProps {
    title: string
    desc: string
    link: string
    image: string
    id?: number
    className?: string
}
