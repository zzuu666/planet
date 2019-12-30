import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
    RefObject
} from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
    Modifier
} from 'draft-js'
import { makeStyles } from '@material-ui/styles'
import { useBlockStyles, createBlockStyleFn } from './blockStyleFn'
import { keyBindingFn } from './keyBindingFn'
import { SideButton } from './SideButton'
import { ToolBar } from './Toolbar'
import { blockRendererFn } from './blockRendererFn'
import { blockRenderMap } from './blockRenderMap'
import { createTitleEditorState } from './editorStateWithTitle'
import { useBoolean } from '../../hooks/useBoolean'

import 'draft-js/dist/Draft.css'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
        padding: '0 60px'
    }
})

const extendBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

/**
 * Make eidtor in focus when it blur
 * // TODO
 * Editor should blur when click away from editor container
 *
 * @param editorState
 * @param editorRef
 */
const useAutoFocus = (
    editorState: EditorState,
    editorRef: RefObject<Editor>
) => {
    useEffect(() => {
        if (!editorRef.current) return

        const selectionState = editorState.getSelection()

        if (!selectionState.getHasFocus()) {
            editorRef.current.focus()
        }
    }, [editorState, editorRef])
}

export const Typora = props => {
    const [editorState, setEditorState] = useState(createTitleEditorState())

    const classes = useStyles()

    const blockClasses = useBlockStyles()

    const editorRef = useRef<Editor>(null)

    const blockStyleFn = useMemo(() => createBlockStyleFn(blockClasses), [
        blockClasses
    ])

    useAutoFocus(editorState, editorRef)

    const [showToolbar, { setTrue, setFalse }] = useBoolean(false)

    const handleKeyCommand = useCallback(
        (command, prevEditorState: EditorState) => {
            if (command === 'myeditor-save') {
                const newEditorState = RichUtils.toggleBlockType(
                    prevEditorState,
                    'blockquote'
                )
                setEditorState(newEditorState)
                return 'handled'
            }

            const newEditorState = RichUtils.handleKeyCommand(
                prevEditorState,
                command
            )

            if (newEditorState) {
                setEditorState(newEditorState)
                return 'handled'
            }
            return 'not-handled'
        },
        []
    )

    const handleReturn = useCallback(() => {}, [])

    // make eidtor be focused after click toolbar
    const handleContainerClick = useCallback(() => {
        if (editorRef.current === null) return

        // TODO remove selection range

        // focus lead to editorState changed
        // use settimeout avoid race conditions
        // setTimeout(() => {
        //     editorRef.current && editorRef.current.focus()
        // }, 0)
    }, [])



    return (
        <div className={classes.root} onClick={handleContainerClick}>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={blockStyleFn}
                blockRendererFn={blockRendererFn}
                blockRenderMap={extendBlockRenderMap}
                keyBindingFn={keyBindingFn}
                placeholder="Tell your story"
            />
            <SideButton editorState={editorState} onChange={setEditorState} />
            <ToolBar
                show={showToolbar}
                editorState={editorState}
                onChange={setEditorState}
                onOpen={setTrue}
                onClose={setFalse}
            />
        </div>
    )
}
