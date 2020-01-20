import { makeStyles } from '@material-ui/styles'
import { ContentBlock } from 'draft-js'
import { BlockType } from './blockTypes'

export const useBlockStyles = makeStyles({
    blockquote: {
        display: 'flex',
        color: '',
        fontSize: '20px',
        lineHeight: 3,

        '&:before': {
            content: '"\'\'"',
            display: '',
            marginRight: 8
        },
        '&:after': {
            content: '"\'\'"',
            display: '',
            marginLeft: 8
        }
    },
    unstyled: {
        fontSize: '16px',
        lineHeight: 2.5
    }
})

export type BlockStyleClasses = Record<'blockquote' | 'unstyled', string>

export const createBlockStyleFn = (classes: BlockStyleClasses) => (
    contentBlock: ContentBlock
) => {
    const type = contentBlock.getType()

    switch (type) {
        case 'blockquote':
            return classes.blockquote
        case BlockType.title:
            return ''
        case BlockType.unstyled:
            return classes.unstyled
        default:
            return ''
    }
}
