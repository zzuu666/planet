import { ContentBlock } from 'draft-js'
import { BlockType } from './blockTypes'
import { BlockImageComponent } from './blockImageComponent'
import { BlockCodeComponent } from './blockCodeComponent'

export const blockRendererFn = (block: ContentBlock) => {
    const type = block.getType()

    switch (type) {
        case BlockType.image:
        case 'atomic':
            return {
                component: BlockImageComponent
            }
        case BlockType.code:
            return {
                component: BlockCodeComponent,
                editable: true
            }
        default:
            return undefined
    }
}
