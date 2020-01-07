/**
 * TODO: issue
 *
 * foucs position will not exact when add a image
 *
 * because the image is unloaded when get selection info
 */

import React, { FC, useCallback } from 'react'
import LinearScaleRounded from '@planet-ui/icons/build/LinearScaleRounded'

import { IconButton } from '../IconButton'

import { ISideButtonProps } from './helper'
import { addNewContentBlock } from '../editorUtils'
import { BlockType } from '../blockTypes'

export const SiderBreakButton: FC<ISideButtonProps> = props => {
    const {
        defaultClassName,
        editorRef,
        editorState,
        closeSider,
        onChange
    } = props

    const handleClick = useCallback(() => {
        const newEditorState = addNewContentBlock(editorState, {
            blockType: BlockType.break,
            position: 'before'
        })

        onChange(newEditorState)
        closeSider && closeSider()
        setTimeout(() => {
            editorRef.current?.focus()
        }, 0)
    }, [closeSider, editorRef, editorState, onChange])

    return (
        <IconButton
            className={defaultClassName}
            icon={LinearScaleRounded}
            onClick={handleClick}
        />
    )
}
