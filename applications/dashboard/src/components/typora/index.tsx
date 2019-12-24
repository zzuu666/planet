import React, { useState, useCallback, useMemo } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Title } from './Title'
import { useBlockStyles, createBlockStyleFn } from './blockStyleFn'
import { keyBindingFn } from './keyBindingFn'

export const Typora = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const blockClasses = useBlockStyles()

    const blockStyleFn = useMemo(() => createBlockStyleFn(blockClasses), [blockClasses])

    const handleKeyCommand = useCallback((command, prevEditorState: EditorState) => {
        console.log(prevEditorState.getCurrentContent())

        if (command === 'myeditor-save') {
            const newEditorState = RichUtils.toggleBlockType(prevEditorState, 'blockquote')
            setEditorState(newEditorState)
            return 'handled'
        }


        const newEditorState = RichUtils.handleKeyCommand(prevEditorState, command)

        if (newEditorState) {
            setEditorState(newEditorState)
            return 'handled'
        }
        return 'not-handled'
    }, [])

    return (
        <div>
            <Title />
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={blockStyleFn}
                keyBindingFn={keyBindingFn}
            />
        </div>
    )
}
