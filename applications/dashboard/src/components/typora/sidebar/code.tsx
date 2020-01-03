import React, { FC, useCallback, useEffect } from 'react'
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
    const { editorState, onChange } = props
    const [showModal, { setFalse, setTrue }] = useBoolean(false)

    const handleClick = useCallback(() => {
        setTrue()
    }, [setTrue])

    const onMonacoSaved = useCallback(
        (editor: Editor.IStandaloneCodeEditor, language) => {
            const code = editor.getValue()

            const newEditorState = addNewContentBlock(
                editorState,
                BlockType.code,
                { lang: language, code }
            )
            onChange && onChange(newEditorState)
            setFalse()
        },
        [editorState, onChange, setFalse]
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
