import {
    EditorState,
    ContentBlock,
    ContentState,
    genKey,
    convertToRaw,
    convertFromRaw,
    RichUtils
} from 'draft-js'
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

interface INewBlockOptions<T extends Object> {
    blockType?: BlockType
    blockData?: T
    position?: 'before' | 'after'
}

/**
 * add a new content block after current content block
 *
 * @param editorState
 * @param blockType specify block type
 *
 * @returns {EditorState} new editor state
 */
export const addNewContentBlock = <T>(
    editorState: EditorState,
    option: INewBlockOptions<T> = {}
): EditorState => {
    const {
        blockType = BlockType.unstyled,
        blockData = {},
        position = 'after'
    } = option

    const insertBefore = position === 'before'
    const insertAfter = position === 'after'

    if (!insertBefore && !insertAfter) {
        throw new Error('option.position is invalid')
    }

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
                insertAfter && [startKey, contentBlock],
                [newContentBlockKey, newContentBlock],
                insertBefore && [startKey, contentBlock]
            ].filter(Boolean),
            afterBlocks
        )
        .toOrderedMap()

    const newContentState = contentState.merge({
        blockMap: newBlockMap,
        selectionBefore: insertAfter
            ? selectionState
            : insertBefore &&
              selectionState.merge({
                  anchorKey: newContentBlockKey,
                  anchorOffset: 0,
                  focusKey: newContentBlockKey,
                  focusOffset: 0,
                  isBackward: false
              }),
        selectionAfter: insertAfter
            ? selectionState.merge({
                  anchorKey: newContentBlockKey,
                  anchorOffset: 0,
                  focusKey: newContentBlockKey,
                  focusOffset: 0,
                  isBackward: false
              })
            : insertBefore && selectionState
    }) as ContentState

    return EditorState.push(editorState, newContentState, 'insert-fragment')
}

export const saveEditorStateToLocalStorage = (editorState: EditorState) => {
    const rawDraftContentState = convertToRaw(editorState.getCurrentContent())

    localStorage.setItem(
        'DRAFT_EDITOR_STATE',
        JSON.stringify(rawDraftContentState)
    )
}

export const getContentStateFromLocalStorage = () => {
    const rawDraftContentStateString = localStorage.getItem(
        'DRAFT_EDITOR_STATE'
    )
    if (rawDraftContentStateString === null) return null

    const rawDraftContentState = JSON.parse(rawDraftContentStateString)

    return convertFromRaw(rawDraftContentState)
}

export const getInitialEditorStateIfHasCache = (
    defaultEditorState?: EditorState
) => {
    const contentState = getContentStateFromLocalStorage()
    if (!contentState) return defaultEditorState || EditorState.createEmpty()

    return EditorState.createWithContent(contentState)
}
