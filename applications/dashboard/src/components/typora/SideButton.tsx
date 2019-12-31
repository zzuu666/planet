import React, {
    FC,
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo
} from 'react'
import { makeStyles } from '@material-ui/styles'
import { EditorState, ContentState, ContentBlock, genKey } from 'draft-js'
import { Map, List } from 'immutable'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import clsx from 'clsx'

import AddRounded from '@planet-ui/icons/build/AddRounded'
import InsertPhotoRounded from '@planet-ui/icons/build/InsertPhotoRounded'
import LinearScaleRounded from '@planet-ui/icons/build/LinearScaleRounded'

import { IconButton } from './IconButton'
import { BlockType } from './blockTypes'
import { getSelectedBlockNode } from './utils'
import { getContentBlock } from './editorUtils'
import { useBoolean } from '../../hooks/useBoolean'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        display: 'flex',
        left: 20,
        top: 0,
        zIndex: 100
    },
    addButton: {
        transition: 'transform .2s linear'
    },
    addButtonOpen: {
        transform: 'rotate(135deg)'
    },
    functionButtonGroup: {
        display: 'flex'
    },
    functionButton: {
        marginLeft: 8
    },
    buttonEnter: {
        opacity: 0
    },
    buttonEnterActive: {
        opacity: 1,
        transition: 'opacity .2s'
    }
})

interface ISideButtonProps {
    show: boolean
    editorState: EditorState
    onChange?: (editorState: EditorState) => void
    onShow: () => void
    onHide: () => void
}

const useSelectionNode = (root: Window, editorState: EditorState) => {
    type SelectionNodeInfo = {
        offsetTop: number
    }
    const prevNode = useRef<HTMLElement | null>(null)
    const [value, setValue] = useState<SelectionNodeInfo | null>(null)
    const prevContentBlock = useRef<string | null>(null)

    const findNode = useCallback(() => {
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
    }, [root])

    useEffect(() => {
        const contentState = editorState.getCurrentContent()
        const selectionState = editorState.getSelection()
        const startKey = selectionState.getStartKey()
        const contentBlock = contentState.getBlockForKey(startKey)

        if (!selectionState.getHasFocus()) {
            return
        }

        // if (prevContentBlock.current !== startKey) {
        //     prevContentBlock.current = startKey
        //     findNode()
        // }

        findNode()
    }, [findNode, editorState]) // need recaculate when editorState have changed

    return value
}

export const SideButton: FC<ISideButtonProps> = props => {
    const { editorState, onChange, show, onShow, onHide } = props

    const classes = useStyles()

    const [isOpen, { toggle, setFalse }] = useBoolean(false)

    const selectionInfo = useSelectionNode(window, editorState)

    /**
     * TODO: issue
     *
     * foucs position will not exact when add a image
     *
     * because the image is unloaded when get selection info
     */
    const handleImageButtonClick = useCallback(() => {
        const selectionState = editorState.getSelection()

        // add a new block must be collapsed
        // it's mean not range selection
        if (!selectionState.isCollapsed()) {
            return
        }
        const contentState = editorState.getCurrentContent()
        const startKey = selectionState.getStartKey()
        const currentBlock = contentState.getBlockForKey(startKey)

        // check if currentBlock not exist or has other content
        if (!currentBlock || currentBlock.getLength() !== 0) {
            return
        }
        const blockMap = contentState.getBlockMap()

        const blocksBefore = blockMap.toSeq().takeUntil(v => v === currentBlock)
        const blocksAfter = blockMap
            .toSeq()
            .skipUntil(v => v === currentBlock)
            .rest()
        const newBlockKey = genKey()

        const mergedCurrentBlock = currentBlock.merge({
            type: BlockType.image,
            data: {
                url:
                    'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=463733675,2912031543&fm=85&app=52&f=JPEG?w=121&h=75&s=90F87F85D668BB4F4430ACA303006087'
            }
        })

        const newBlock = new ContentBlock({
            key: newBlockKey,
            type: BlockType.unstyled,
            text: '',
            characterList: List(),
            depth: 0,
            data: Map({})
        })

        const newBlockMap = blocksBefore
            .concat(
                [
                    [startKey, mergedCurrentBlock],
                    [newBlockKey, newBlock]
                ],
                blocksAfter
            )
            .toOrderedMap()

        const newContentState = contentState.merge({
            blockMap: newBlockMap,
            selectionBefore: selectionState,
            selectionAfter: selectionState.merge({
                anchorKey: newBlockKey,
                anchorOffset: 0,
                focusKey: newBlockKey,
                focusOffset: 0,
                isBackward: false
            })
        }) as ContentState

        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-fragment'
        )

        onChange && onChange(newEditorState)
        setFalse()
    }, [editorState, onChange, setFalse])

    const handleBreakButtonClick = useCallback(() => {
        setFalse()
    }, [setFalse])

    const buttonList = useMemo(() => {
        const list = [
            {
                name: 'image',
                icon: InsertPhotoRounded,
                onClick: handleImageButtonClick
            },
            {
                name: 'break',
                icon: LinearScaleRounded,
                onClick: handleBreakButtonClick
            }
        ]

        return list
    }, [handleImageButtonClick, handleBreakButtonClick])

    useEffect(() => {
        const selectionState = editorState.getSelection()
        const startOffset = selectionState.getStartOffset()
        const contentBlock = getContentBlock(editorState)
        const contentBlockLength = contentBlock.getLength()
        const contentBlockType = contentBlock.getType()

        if (
            startOffset === 0 &&
            contentBlockLength === 0 &&
            contentBlockType !== BlockType.title &&
            contentBlockType !== BlockType.image
        ) {
            onShow()
        } else {
            onHide()
        }
    }, [editorState, onShow, onHide])

    return (
        <div
            className={classes.root}
            style={{
                top: selectionInfo?.offsetTop,
                display: show ? '' : 'none'
            }}
        >
            <IconButton
                className={clsx(classes.addButton, {
                    [classes.addButtonOpen]: isOpen
                })}
                icon={AddRounded}
                onClick={toggle}
            />
            {isOpen && (
                <TransitionGroup className={classes.functionButtonGroup}>
                    {buttonList.map(button => (
                        <CSSTransition
                            appear
                            classNames={{
                                enter: classes.buttonEnter,
                                enterActive: classes.buttonEnterActive,
                                appear: classes.buttonEnter,
                                appearActive: classes.buttonEnterActive
                            }}
                            key={button.name}
                            timeout={200}
                        >
                            <IconButton
                                className={classes.functionButton}
                                icon={button.icon}
                                onClick={button.onClick}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </div>
    )
}
