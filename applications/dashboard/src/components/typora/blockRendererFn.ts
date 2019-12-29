import { ContentBlock } from 'draft-js'
import { BlockType } from './blockTypes'
import { BlockImageComponent } from './blockImageComponent'

export const blockRendererFn = (block: ContentBlock) => {
    const type = block.getType()

    switch (type) {
        case BlockType.image:
        case 'atomic':
            return {
                component: BlockImageComponent
            }
        default:
            return undefined
    }
}
