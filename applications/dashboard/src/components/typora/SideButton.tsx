import React, { FC, useEffect, useRef, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    EditorState,
    ContentState,
    ContentBlock,
    RichUtils,
    genKey
} from 'draft-js'
import { Map, List } from 'immutable'
import AddRounded from '@planet-ui/icons/build/AddRounded'

import { SvgIconFactory } from './SvgIcon'
import { EntityType } from './entityTypes'
import { BlockType } from './blockTypes'

const AddButton = SvgIconFactory(AddRounded)

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: 20,
        top: 0
    }
})

interface ISideButtonProps {
    editorState: EditorState
    onChange?: (editorState: EditorState) => void
}

const getSelectedBlockNode = (root: Window) => {
    const selection = root.getSelection()
    if (!selection || selection.rangeCount === 0) {
        return null
    }
    let node: HTMLElement | null = selection.getRangeAt(0)
        .startContainer as HTMLElement
    do {
        if (node.getAttribute && node.getAttribute('data-block') === 'true') {
            return node
        }
        node = node.parentNode as HTMLElement
    } while (node !== null)

    return node
}

const useSelectionNode = (root: Window, editorState: EditorState) => {
    type SelectionNodeInfo = {
        offsetTop: number
    }
    const prevNode = useRef<HTMLElement | null>(null)
    const [value, setValue] = useState<SelectionNodeInfo | null>(null)

    useEffect(() => {
        const node = getSelectedBlockNode(root)

        if (prevNode.current === node) {
            return
        }

        prevNode.current = node

        if (!node) {
            setValue(null)
            return
        }

        setValue({
            offsetTop: node.offsetTop
        })
    }, [root, editorState]) // need recaculate when editorState have changed

    return value
}

export const SideButton: FC<ISideButtonProps> = props => {
    const { editorState, onChange } = props

    const classes = useStyles()

    const selectionInfo = useSelectionNode(window, editorState)

    const handleAddButtonClick = useCallback(() => {
        console.log('start')
        const selectionState = editorState.getSelection()

        // add a new block must be collapsed
        // it's mean not range selection
        if (!selectionState.isCollapsed()) {
            console.log('fail  1')
            return
        }
        const contentState = editorState.getCurrentContent()
        const startKey = selectionState.getStartKey()
        const currentBlock = contentState.getBlockForKey(startKey)

        // check if currentBlock not exist or has other content
        if (!currentBlock || currentBlock.getLength() !== 0) {
            console.log('fail')
            return
        }
        const blockMap = contentState.getBlockMap()

        const blocksBefore = blockMap.toSeq().takeUntil(v => v === currentBlock)
        const blocksAfter = blockMap
            .toSeq()
            .skipUntil(v => v === currentBlock)
            .rest()
        const newBlockKey = genKey()

        const newBlock = new ContentBlock({
            key: newBlockKey,
            type: BlockType.image,
            text: '',
            characterList: List(),
            depth: 0,
            data: Map({
                url:
                    'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=463733675,2912031543&fm=85&app=52&f=JPEG?w=121&h=75&s=90F87F85D668BB4F4430ACA303006087'
            })
        })

        const newBlockMap = blocksBefore
            .concat(
                [
                    [newBlockKey, newBlock],
                    [startKey, currentBlock]
                ],
                blocksAfter
            )
            .toOrderedMap()


        const newContentState = contentState.merge({
            blockMap: newBlockMap,
            selectionBefore: selectionState.merge({
                anchorKey: newBlockKey,
                anchorOffset: 0,
                focusKey: newBlockKey,
                focusOffset: 0,
                isBackward: false
            }),
            selectionAfter: selectionState
        }) as ContentState

        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-fragment'
        )

        console.log('success')

        onChange && onChange(newEditorState)
    }, [editorState, onChange])

    return (
        <div className={classes.root} style={{ top: selectionInfo?.offsetTop }}>
            <AddButton onClick={handleAddButtonClick} />
        </div>
    )
}
