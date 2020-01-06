import { EditorState, DraftHandleValue, RichUtils } from 'draft-js'
import { EditorCommand } from './editorCommand'
import { BlockType } from './blockTypes'
import { getContentBlock, saveEditorStateToLocalStorage } from './editorUtils'

export const createtHandleKeyCommand = (setEditorState: Function) => (
    command: EditorCommand,
    editorState: EditorState,
    eventTimeStamp: number
): DraftHandleValue => {
    if (command === 'backspace') {
        const contentBlock = getContentBlock(editorState)
        if (contentBlock.getType() === BlockType.title) {
            return 'not-handled'
        }
    }

    if (command === 'save') {
        saveEditorStateToLocalStorage(editorState)

        return 'not-handled'
    }

    const newEditorState = RichUtils.handleKeyCommand(editorState, command)

    if (newEditorState) {
        setEditorState(newEditorState)
        return 'handled'
    }

    return 'not-handled'
}
