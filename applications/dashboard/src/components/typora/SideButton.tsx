import React, { FC, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { EditorState } from 'draft-js'
import AddButton from '@planet-ui/icons/build/AddRounded'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: 20,
        top: 0
    }
})

interface ISideButtonProps {
    editorState: EditorState
}

const getSelectedBlockNode = (root: Window) => {
    const selection = root.getSelection()
    if (!selection || selection.rangeCount === 0) {
        return null
    }
    let node: HTMLElement | null = selection.getRangeAt(0).startContainer as HTMLElement
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
            return;
        }

        prevNode.current = node

        if (!node) {
            setValue(null)
            return;
        }

        setValue({
            offsetTop: node.offsetTop
        })
    }, [root, editorState]) // need recaculate when editorState have changed

    return value
}

export const SideButton: FC<ISideButtonProps> = props => {
    const { editorState } = props

    const classes = useStyles()

    const selectionInfo = useSelectionNode(window, editorState)


    return (
        <div className={classes.root} style={{ top: selectionInfo?.offsetTop }}>
            <AddButton viewBox="0 0 24 24" style={{ height: 16, width: 16 }} />
        </div>
    )
}
