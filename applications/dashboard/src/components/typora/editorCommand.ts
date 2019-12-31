import { DraftEditorCommand } from 'draft-js'


type CustomEditorCommand = 'myeditor-save'

export type EditorCommand = DraftEditorCommand | CustomEditorCommand
