export { ArticleCard } from './card'
export { ArticleBig } from './big'
export { ArticleHorizontal } from './horizontal'

export interface IArticleCardProps {
    title: string
    desc: string
    link: string
    image: string
    className?: string
}
