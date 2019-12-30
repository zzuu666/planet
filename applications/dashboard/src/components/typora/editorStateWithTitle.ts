import { EditorState, ContentBlock, ContentState, RichUtils } from 'draft-js'
import { BlockType } from './blockTypes'

export const createEditorStateWithTitle = () => {
    const editorState = EditorState.createEmpty()

    const contentState = editorState.getCurrentContent()

    const selectionState = editorState.getSelection()

    const startKey = selectionState.getStartKey()

    const contentBlock = contentState.getBlockForKey(startKey)

    const contentBlockWithTitle = contentBlock.merge({
        type: BlockType.title
    }) as ContentBlock

    const newContentState = contentState.merge({
        blockMap: contentState
            .getBlockMap()
            .set(startKey, contentBlockWithTitle)
    }) as ContentState

    return EditorState.set(editorState, {
        currentContent: newContentState
    })
}

export const createTitleEditorState = () => {
    const editorState = EditorState.createEmpty()

    return RichUtils.toggleBlockType(editorState, BlockType.title)
}
