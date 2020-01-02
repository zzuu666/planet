import React, { FC, useCallback, useEffect } from 'react'
import CodeRounded from '@planet-ui/icons/build/CodeRounded'
import {editor as Editor} from 'monaco-editor'

import { IconButton } from '../IconButton'
import { ISideButtonProps } from './helper'
import { useBoolean } from '../../../hooks/useBoolean'

import { Modal } from '../../modal'
import { MonacoEditor } from '../../monaco'


export const SideCodeButton: FC<ISideButtonProps> = (props) => {
    const { editorState } = props
    const [ showModal, { setFalse, setTrue } ] = useBoolean(false)

    const handleClick = useCallback(() => {
        setTrue()
    }, [setTrue])

    const onMonacoSaved = useCallback((editor: Editor.IStandaloneCodeEditor) => {
        console.log(editor.getValue())
    }, [])



    return (
        <>
            <IconButton icon={CodeRounded} onClick={handleClick} />
            <Modal show={showModal} onClose={setFalse}>
                <MonacoEditor onSave={onMonacoSaved} />
            </Modal>
        </>
    )
}
