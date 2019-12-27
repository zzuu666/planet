import React, { FC, useCallback, useMemo, SyntheticEvent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { EditorState, RichUtils, DraftBlockType, DraftInlineStyle } from 'draft-js'
import TitleRounded from '@planet-ui/icons/build/TitleRounded'
import BoldRounded from '@planet-ui/icons/build/FormatBoldRounded'

import { SvgIconFactory } from './SvgIcon'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        listStyle: 'none'
    },
    item: {},
    button: {
        display: 'flex',
        alignItems: 'center',
        outline: 'none',
        border: 'none',
        backgroundColor: '#555',
        color: '#fff'
    },
    svg: {}
})

type ButtonType = 'BLOCKTYPE' | 'BLOCKSTYLING'

interface IButtonInfo {
    icon: React.ElementType
    isActive: boolean
    name: string
    type: ButtonType
}

interface IToolBarProps {
    editorState: EditorState
    onChange: (editorState: EditorState) => void
}

interface IBlockInfo {
    type: DraftBlockType
    style: DraftInlineStyle
}

const TitleIcon = SvgIconFactory(TitleRounded)
const BoldIcon = SvgIconFactory(BoldRounded)

export const ToolBar: FC<IToolBarProps> = props => {
    const { onChange, editorState } = props

    const classes = useStyles()

    const handleButtonClick = useCallback((event: SyntheticEvent<HTMLButtonElement>) => {
        if (!onChange) {
            return;
        }

        const { name, type } = event.currentTarget.dataset

        const toggleUtils =
            (type as ButtonType) === 'BLOCKTYPE' ? RichUtils.toggleBlockType
                : (type as ButtonType) === 'BLOCKSTYLING' && RichUtils.toggleInlineStyle

        if (!toggleUtils) {
            return;
        }

        const newEditorState = toggleUtils(editorState, name as string)

        onChange(newEditorState)
    }, [onChange, editorState])

    const blockInfo: IBlockInfo = useMemo(() => {
        const selection = editorState.getSelection()
        const anchorKey = selection.getAnchorKey()
        const anchorOffset = selection.getAnchorOffset()
        const content = editorState.getCurrentContent()
        const currentContentBlock = content.getBlockForKey(anchorKey)
        const contentBlockType = currentContentBlock.getType()
        const contentBlockStyle = currentContentBlock.getInlineStyleAt(
            anchorOffset
        )

        console.log(contentBlockStyle.toArray())

        return {
            type: contentBlockType,
            style: contentBlockStyle
        }
    }, [editorState])

    const buttonList = useMemo(() => {
        const list: IButtonInfo[] = [
            {
                name: 'BOLD',
                type: 'BLOCKSTYLING',
                icon: BoldIcon,
                isActive: blockInfo.style.has('BOLD')
            },
            {
                name: 'header-one',
                type: 'BLOCKTYPE',
                icon: TitleIcon,
                isActive: blockInfo.type === 'header-one'
            }
        ]

        return list
    }, [blockInfo])

    return (
        <ul className={classes.root}>
            {buttonList.map(info => (
                <li className={classes.item} key={info.name}>
                    <button
                        className={classes.button}
                        onClick={handleButtonClick}
                        data-type={info.type}
                        data-name={info.name}
                    >
                        <info.icon
                            color={
                                info.isActive ? 'green' : '#fff'
                            }
                        />
                    </button>
                </li>
            ))}
        </ul>
    )
}
