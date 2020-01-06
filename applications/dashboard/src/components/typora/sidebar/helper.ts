import { RefObject } from 'react'
import { EditorState, Editor } from 'draft-js'

export interface ISideButtonProps {
    editorState: EditorState
    editorRef: RefObject<Editor | null>
    onChange?: (edtiorState: EditorState) => void
    closeSider?: () => void
}
