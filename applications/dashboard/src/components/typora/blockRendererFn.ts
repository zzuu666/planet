import { ContentBlock } from 'draft-js'
import { BlockType } from './blockTypes'
import { BlockImageComponent } from './blockImageComponent'
import { BlockCodeComponent } from './blockCodeComponent'
import { BlockBreakComponent } from './blockBreakComponent'

export const blockRendererFn = (block: ContentBlock) => {
    const type = block.getType()

    switch (type) {
        case BlockType.image:
            return {
                component: BlockImageComponent
            }
        case BlockType.code:
            return {
                component: BlockCodeComponent
            }
        case BlockType.break:
            return {
                component: BlockBreakComponent,
                editable: false
            }
        default:
            return undefined
    }
}
