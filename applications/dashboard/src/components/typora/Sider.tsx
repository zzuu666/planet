import React, {
    FC,
    useEffect,
    useRef,
    useState,
    useCallback,
    RefObject,
    ComponentType
} from 'react'
import { makeStyles } from '@material-ui/styles'
import { EditorState, Editor } from 'draft-js'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import clsx from 'clsx'

import AddRounded from '@planet-ui/icons/build/AddRounded'

import { IconButton } from './IconButton'
import { BlockType } from './blockTypes'
import { getSelectedBlockNode } from './utils'
import { getContentBlock } from './editorUtils'
import { useBoolean } from '../../hooks/useBoolean'

import { ISideButtonProps } from './sidebar/helper'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        display: 'flex',
        left: 20,
        top: 0,
        zIndex: 10
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

interface ISiderProps {
    show: boolean
    editorState: EditorState
    editorRef: RefObject<Editor | null>
    buttons: ComponentType<ISideButtonProps>[]
    onChange: (editorState: EditorState) => void
    onShow: () => void
    onHide: () => void
}

const useSelectionNode = (root: Window, editorState: EditorState) => {
    type SelectionNodeInfo = {
        offsetTop: number
    }
    const prevNode = useRef<HTMLElement | null>(null)
    const [value, setValue] = useState<SelectionNodeInfo | null>(null)

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
        const selectionState = editorState.getSelection()

        if (!selectionState.getHasFocus()) {
            return
        }

        findNode()
    }, [findNode, editorState]) // need recaculate when editorState have changed

    return value
}

export const Sider: FC<ISiderProps> = props => {
    const {
        editorState,
        editorRef,
        onChange,
        show,
        onShow,
        onHide,
        buttons
    } = props

    const classes = useStyles()

    const [isOpen, { toggle, setFalse }] = useBoolean(false)

    const selectionInfo = useSelectionNode(window, editorState)

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
            contentBlockType !== BlockType.image &&
            contentBlockType !== BlockType.break
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
                    {buttons.map((Component, index) => (
                        <CSSTransition
                            appear
                            classNames={{
                                enter: classes.buttonEnter,
                                enterActive: classes.buttonEnterActive,
                                appear: classes.buttonEnter,
                                appearActive: classes.buttonEnterActive
                            }}
                            timeout={200}
                            key={index}
                        >
                            <Component
                                editorState={editorState}
                                editorRef={editorRef}
                                onChange={onChange}
                                closeSider={setFalse}
                                defaultClassName={classes.functionButton}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </div>
    )
}
