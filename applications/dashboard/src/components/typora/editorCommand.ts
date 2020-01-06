import { DraftEditorCommand } from 'draft-js'

type CustomEditorCommand = 'save'

export type EditorCommand = DraftEditorCommand | CustomEditorCommand
