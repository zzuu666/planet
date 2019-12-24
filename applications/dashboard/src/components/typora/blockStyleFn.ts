import { makeStyles } from '@material-ui/styles'
import { ContentBlock,  } from 'draft-js'

export const useBlockStyles = makeStyles({
    blockquote: {
        color: 'red'
    }
})

export type BlockStyleClasses = Record<'blockquote', string>

export const createBlockStyleFn = (classes: BlockStyleClasses) => (contentBlock: ContentBlock) => {
    const type = contentBlock.getType()

    console.log(type)

    switch (type) {
        case 'blockquote':
            return classes.blockquote
        default:
            return '';
    }
}

