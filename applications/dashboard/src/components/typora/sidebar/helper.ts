import { EditorState } from 'draft-js'

export interface ISideButtonProps {
    editorState: EditorState
    onChange?: (edtiorState: EditorState) => void
}
