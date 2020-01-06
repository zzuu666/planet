import React, { FC, useCallback } from 'react'
import CodeRounded from '@planet-ui/icons/build/CodeRounded'
import { editor as Editor } from 'monaco-editor'

import { IconButton } from '../IconButton'
import { ISideButtonProps } from './helper'
import { useBoolean } from '../../../hooks/useBoolean'

import { Modal } from '../../modal'
import { MonacoEditor } from '../../monaco'

import { addNewContentBlock } from '../editorUtils'
import { BlockType } from '../blockTypes'

export const SideCodeButton: FC<ISideButtonProps> = props => {
    const { editorState, onChange, closeSider, editorRef } = props
    const [showModal, { setFalse, setTrue }] = useBoolean(false)

    const handleClick = useCallback(() => {
        setTrue()
    }, [setTrue])

    const onMonacoSaved = useCallback(
        (editor: Editor.IStandaloneCodeEditor, language) => {
            const code = editor.getValue()

            const newEditorState = addNewContentBlock(editorState, {
                blockType: BlockType.code,
                blockData: { lang: language, code },
                position: 'before'
            })
            onChange && onChange(newEditorState)
            setFalse()
            closeSider && closeSider()
            setTimeout(() => {
                editorRef.current?.focus()
            }, 0)
        },
        [editorState, onChange, setFalse, closeSider, editorRef]
    )

    return (
        <>
            <IconButton icon={CodeRounded} onClick={handleClick} />
            <Modal show={showModal} onClose={setFalse}>
                <MonacoEditor onSave={onMonacoSaved} />
            </Modal>
        </>
    )
}
