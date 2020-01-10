import React, { FC, useCallback } from 'react'
import InsertPhotoRounded from '@planet-ui/icons/build/InsertPhotoRounded'

import { addNewContentBlock } from '../editorUtils'
import { IconButton } from '../IconButton'
import { Modal } from './../../modal'
import { useBoolean } from '../../../hooks/useBoolean'
import { useInput } from '../../../hooks/useInput'
import { ISideButtonProps } from './helper'
import { BlockType } from '../blockTypes'

export const SiderImageButton: FC<ISideButtonProps> = props => {
    const {
        defaultClassName,
        onChange,
        editorState,
        editorRef,
        closeSider
    } = props
    const [showModal, { setTrue, setFalse }] = useBoolean(false)
    const [imageSrc, handleInputChange] = useInput('')

    const handleModalConfrim = useCallback(() => {
        const newEditorState = addNewContentBlock(editorState, {
            blockType: BlockType.image,
            position: 'before',
            blockData: { src: imageSrc }
        })

        onChange(newEditorState)
        closeSider()
        setTimeout(() => {
            editorRef.current?.focus()
        }, 0)
    }, [editorState, imageSrc, onChange, editorRef, closeSider])

    return (
        <>
            <IconButton
                className={defaultClassName}
                icon={InsertPhotoRounded}
                onClick={setTrue}
            />
            <Modal
                show={showModal}
                onClose={setFalse}
                onCancel={setFalse}
                onConfirm={handleModalConfrim}
            >
                <input value={imageSrc} onChange={handleInputChange} />
            </Modal>
        </>
    )
}
