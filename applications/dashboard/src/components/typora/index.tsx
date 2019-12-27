import React, { useState, useCallback, useMemo } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { makeStyles } from '@material-ui/styles'
import { useBlockStyles, createBlockStyleFn } from './blockStyleFn'
import { keyBindingFn } from './keyBindingFn'
import { SideButton } from './SideButton'
import { ToolBar } from './Toolbar'

import 'draft-js/dist/Draft.css'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
        padding: '0 60px'
    }
});

export const Typora = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const classes = useStyles()

    const blockClasses = useBlockStyles()

    const blockStyleFn = useMemo(() => createBlockStyleFn(blockClasses), [blockClasses])

    const handleKeyCommand = useCallback((command, prevEditorState: EditorState) => {
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
        <div className={classes.root}>
            <ToolBar editorState={editorState} onChange={setEditorState} />
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={blockStyleFn}
                keyBindingFn={keyBindingFn}
                placeholder="Tell your story"
            />
            <SideButton editorState={editorState} />
        </div>
    )
}
