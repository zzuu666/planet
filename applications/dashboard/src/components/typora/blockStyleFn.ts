import { makeStyles } from '@material-ui/styles'
import { ContentBlock } from 'draft-js'
import { BlockType } from './blockTypes'

export const useBlockStyles = makeStyles({
    blockquote: {
        color: 'red'
    }
})

export type BlockStyleClasses = Record<'blockquote', string>

export const createBlockStyleFn = (classes: BlockStyleClasses) => (
    contentBlock: ContentBlock
) => {
    const type = contentBlock.getType()

    switch (type) {
        case 'blockquote':
            return classes.blockquote
        case 'title':
            return ''
        default:
            return ''
    }
}
