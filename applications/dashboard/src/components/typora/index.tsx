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
    DefaultDraftBlockRenderMap,
    DraftHandleValue
} from 'draft-js'
import { createUseStyles } from 'react-jss'
import { useBlockStyles, createBlockStyleFn } from './blockStyleFn'
import { keyBindingFn } from './keyBindingFn'
import { Sider } from './Sider'
import { ToolBar } from './Toolbar'
import { blockRendererFn } from './blockRendererFn'
import { blockRenderMap } from './blockRenderMap'
import { createTitleEditorState } from './editorStateWithTitle'
import { useBoolean } from '../../hooks/useBoolean'
import {
    getContentBlock,
    addNewContentBlock,
    getInitialEditorStateIfHasCache
} from './editorUtils'
import { createtHandleKeyCommand } from './handleKeyCommand'
import { createHandleBeforeInput } from './handleBeforeInput'
import { SideCodeButton } from './sidebar/code'
import { SiderBreakButton } from './sidebar/Break'
import { SiderImageButton } from './sidebar/Image'

import 'draft-js/dist/Draft.css'
import { BlockType } from './blockTypes'

const useStyles = createUseStyles({
    root: {
        position: 'relative',
        width: '800px',
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
    editorRef: RefObject<Editor>,
    shouldFocus: boolean
) => {
    useEffect(() => {
        if (!editorRef.current || !shouldFocus) return

        const selectionState = editorState.getSelection()

        if (!selectionState.getHasFocus()) {
            editorRef.current.focus()
        }
    }, [editorState, editorRef, shouldFocus])
}

export const Typora = React.memo(props => {
    const [editorState, setEditorState] = useState(
        getInitialEditorStateIfHasCache(createTitleEditorState())
    )

    const classes = useStyles()

    const blockClasses = useBlockStyles()

    const editorRef = useRef<Editor>(null)

    const blockStyleFn = useMemo(() => createBlockStyleFn(blockClasses), [
        blockClasses
    ])

    const siderButtons = useMemo(
        () => [SideCodeButton, SiderBreakButton, SiderImageButton],
        []
    )

    const [showToolbar, { setTrue, setFalse }] = useBoolean(false)

    const [
        showSidebar,
        { setTrue: setSidebarShow, setFalse: setSidebarHide }
    ] = useBoolean(false)

    useAutoFocus(editorState, editorRef, showToolbar)

    const handleKeyCommand = useMemo(
        () => createtHandleKeyCommand(setEditorState),
        []
    )

    const handleBeforeInput = createHandleBeforeInput(setEditorState)

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

            if (
                blockType === BlockType.title ||
                blockType === BlockType.break ||
                blockType === BlockType.code ||
                blockType === BlockType.image
            ) {
                setEditorState(addNewContentBlock(prevEditorState))
                return 'handled'
            }

            return 'not-handled'
        },
        []
    )

    return (
        <div className={classes.root}>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                handleBeforeInput={handleBeforeInput}
                handleReturn={handleReturn}
                blockStyleFn={blockStyleFn}
                blockRendererFn={blockRendererFn}
                blockRenderMap={extendBlockRenderMap}
                keyBindingFn={keyBindingFn}
                placeholder="Tell your story"
            />
            <Sider
                editorState={editorState}
                editorRef={editorRef}
                onChange={setEditorState}
                onHide={setSidebarHide}
                onShow={setSidebarShow}
                show={showSidebar}
                buttons={siderButtons}
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
})
