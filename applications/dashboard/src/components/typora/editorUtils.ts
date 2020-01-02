import { EditorState, ContentBlock, ContentState, genKey } from 'draft-js'
import { Map, List } from 'immutable'
import { BlockType } from './blockTypes'

/**
 * get current content block from editor state
 *
 * @param editorState  DraftJS EditorState
 * @returns {ContentBlock} Content block which selection startkey in
 */
export const getContentBlock = (editorState: EditorState): ContentBlock => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const startKey = selectionState.getStartKey()
    const contentBlock = contentState.getBlockForKey(startKey)

    return contentBlock
}


/**
 * add a new content block after current content block
 *
 * @param editorState
 * @param blockType specify block type
 *
 * @returns {EditorState} new editor state
 */
export const addNewContentBlock = (
    editorState: EditorState,
    blockType = BlockType.unstyled,
    blockData = {}
): EditorState => {
    const contentState = editorState.getCurrentContent()
    const contentBlockMap = contentState.getBlockMap()
    const selectionState = editorState.getSelection()
    const startKey = selectionState.getStartKey()

    // current block
    const contentBlock = contentState.getBlockForKey(startKey)

    // blocks before current block
    const beforeBlocks = contentBlockMap
        .toSeq()
        .takeUntil(v => v === contentBlock)

    // blocks after current block
    const afterBlocks = contentBlockMap
        .toSeq()
        .skipUntil(v => v === contentBlock)
        .rest()

    const newContentBlockKey = genKey()
    const newContentBlock = new ContentBlock({
        key: newContentBlockKey,
        type: blockType,
        text: '',
        characterList: List(),
        depth: 0,
        data: Map(blockData)
    })

    const newBlockMap = beforeBlocks
        .concat(
            [
                [startKey, contentBlock],
                [newContentBlockKey, newContentBlock]
            ],
            afterBlocks
        )
        .toOrderedMap()

    const newContentState = contentState.merge({
        blockMap: newBlockMap,
        selectionBefore: selectionState,
        selectionAfter: selectionState.merge({
            anchorKey: newContentBlockKey,
            anchorOffset: 0,
            focusKey: newContentBlockKey,
            focusOffset: 0,
            isBackward: false
        })
    }) as ContentState

    return EditorState.push(editorState, newContentState, 'insert-fragment')
}
