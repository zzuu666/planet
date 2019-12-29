import React, { useState, useCallback, useMemo, useRef } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { makeStyles } from '@material-ui/styles'
import { useBlockStyles, createBlockStyleFn } from './blockStyleFn'
import { keyBindingFn } from './keyBindingFn'
import { SideButton } from './SideButton'
import { ToolBar } from './Toolbar'
import { blockRendererFn } from './blockRendererFn'

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

    const editorRef = useRef<Editor>(null)

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

    const handleReturn = useCallback(() => {

    }, [])

    // make eidtor be focused after click toolbar
    const handleContainerClick = useCallback(() => {
        if (editorRef.current === null) return

        console.log('need fo')

        // focus lead to editorState changed
        // use settimeout avoid race conditions
        setTimeout(() => {
            editorRef.current && editorRef.current.focus()
        }, 20)
    }, [])

    return (
        <div className={classes.root} onClick={handleContainerClick}>
            <ToolBar editorState={editorState} onChange={setEditorState} />
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={blockStyleFn}
                blockRendererFn={blockRendererFn}
                keyBindingFn={keyBindingFn}
                placeholder="Tell your story"
            />
            <SideButton editorState={editorState} onChange={setEditorState} />
        </div>
    )
}
