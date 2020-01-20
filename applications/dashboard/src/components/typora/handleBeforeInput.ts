import { DraftHandleValue, EditorState } from 'draft-js'
import { getContentBlock, resetBlockWithType } from './editorUtils'
import { BlockType } from './blockTypes'

const shouldChangeBlockType = (
    directive: string,
    targetType: BlockType,
    chars: string,
    contentBlockText: string,
    contentBlockLength: number,
    contentBlockType: BlockType
): boolean => {
    if (targetType === contentBlockType) {
        return false
    }
    const directiveLenght = directive.length
    if (contentBlockLength !== directiveLenght - 1) {
        return false
    }

    const currentContentText = contentBlockText + chars
    return currentContentText === directive
}

export const createHandleBeforeInput = (setEditorState: Function) => (
    chars: string,
    editorState: EditorState
): DraftHandleValue => {
    const contentBlock = getContentBlock(editorState)
    const contentBlockLength = contentBlock.getLength()
    const contentBlockText = contentBlock.getText()
    const contentBlockType = contentBlock.getType() as BlockType

    if (contentBlockLength > 1) {
        return 'not-handled'
    }

    if (
        shouldChangeBlockType(
            '+ ',
            BlockType.unorderedListItem,
            chars,
            contentBlockText,
            contentBlockLength,
            contentBlockType
        )
    ) {
        const newEditorState = resetBlockWithType(
            editorState,
            BlockType.unorderedListItem
        )
        setEditorState(newEditorState)

        return 'handled'
    }

    return 'not-handled'
}
