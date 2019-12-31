import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
    RefObject,
    KeyboardEvent
} from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
    DraftHandleValue
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
import { getContentBlock, addNewContentBlock } from './editorUtils'

import 'draft-js/dist/Draft.css'
import { BlockType } from './blockTypes'
import { EditorCommand } from './editorCommand'

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
    const [showSidebar, { setTrue: setSidebarShow, setFalse: setSidebarHide }] = useBoolean(false)

    const handleKeyCommand = useCallback(
        (command: EditorCommand, prevEditorState: EditorState) => {
            if (command === 'backspace') {
                const contentBlock = getContentBlock(prevEditorState)
                if (contentBlock.getType() === BlockType.title) {
                    return 'not-handled'
                }
            }

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

    /**
     * To remove some block type when return
     *
     * @see https://draftjs.org/docs/api-reference-editor#handlereturn
     */
    const handleReturn = useCallback(
        (
            event: KeyboardEvent,
            prevEditorState: EditorState
        ): DraftHandleValue => {
            const contentBlock = getContentBlock(prevEditorState)

            const blockType = contentBlock.getType()

            if (blockType === BlockType.title) {
                setEditorState(addNewContentBlock(prevEditorState))
                return 'handled'
            }

            return 'not-handled'

        },
        []
    )

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
                handleReturn={handleReturn}
                blockStyleFn={blockStyleFn}
                blockRendererFn={blockRendererFn}
                blockRenderMap={extendBlockRenderMap}
                keyBindingFn={keyBindingFn}
                placeholder="Tell your story"
            />
            <SideButton
                editorState={editorState}
                onChange={setEditorState}
                show={showSidebar}
            />
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
