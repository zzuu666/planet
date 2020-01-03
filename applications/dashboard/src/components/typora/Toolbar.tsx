import React, {
    FC,
    useCallback,
    useMemo,
    SyntheticEvent,
    useEffect
} from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    EditorState,
    RichUtils,
    DraftBlockType,
    DraftInlineStyle
} from 'draft-js'
import TitleRounded from '@planet-ui/icons/build/TitleRounded'
import BoldRounded from '@planet-ui/icons/build/FormatBoldRounded'
import FormatItalicRounded from '@planet-ui/icons/build/FormatItalicRounded'
import FormatQuoteRounded from '@planet-ui/icons/build/FormatQuoteRounded'

import { SvgIconFactory, ISvgIconProps } from './SvgIcon'
import { useHash } from '../../hooks/useHash'

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        display: 'flex',
        listStyle: 'none',
        zIndex: 100,
        padding: 0,
        margin: 0,
        height: 40,
        borderRadius: 4,
        transform: 'translate(-50%, -52px)',
        '&:after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            bottom: '-8px',
            left: '50%',
            marginLeft: '-8px',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '8px 8px 0 8px',
            borderColor: '#555 transparent transparent transparent'
        }
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        outline: 'none',
        border: 'none',
        backgroundColor: '#555',
        color: '#fff',
        height: 40,
        width: 40
    },
    li: {
        overflow: 'hidden',
        '&:first-child': {
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4
        },
        '&:last-child': {
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4
        }
    }
})

type ButtonType = 'BLOCKTYPE' | 'BLOCKSTYLING'

interface IButtonInfo {
    icon: React.ElementType
    isActive: boolean
    name: string
    type: ButtonType
    iconProps?: ISvgIconProps
}

interface IToolBarProps {
    show: boolean
    editorState: EditorState
    onChange: (editorState: EditorState) => void
    onOpen: () => void
    onClose: () => void
}

interface IBlockInfo {
    type: DraftBlockType
    style: DraftInlineStyle
}

const TitleIcon = SvgIconFactory(TitleRounded)
const BoldIcon = SvgIconFactory(BoldRounded)
const ItalicIcon = SvgIconFactory(FormatItalicRounded)
const QuoteIcon = SvgIconFactory(FormatQuoteRounded)

export const ToolBar: FC<IToolBarProps> = props => {
    const { editorState, onChange, onClose, onOpen, show } = props

    const classes = useStyles()

    const handleButtonClick = useCallback(
        (event: SyntheticEvent<HTMLButtonElement>) => {
            if (!onChange) {
                return
            }

            const { name, type } = event.currentTarget.dataset

            const toggleUtils =
                (type as ButtonType) === 'BLOCKTYPE'
                    ? RichUtils.toggleBlockType
                    : (type as ButtonType) === 'BLOCKSTYLING' &&
                      RichUtils.toggleInlineStyle

            if (!toggleUtils) {
                return
            }

            const newEditorState = toggleUtils(editorState, name as string)

            onChange(newEditorState)
        },
        [onChange, editorState]
    )

    /**
     * get current content type and style
     *
     * @see https://draftjs.org/docs/api-reference-content-block
     */
    const blockInfo: IBlockInfo = useMemo(() => {
        const selection = editorState.getSelection()
        const currentInlineStyle = editorState.getCurrentInlineStyle()
        // difference between anchor and foucs
        // see https://developer.mozilla.org/en-US/docs/Web/API/Selection
        const anchorKey = selection.getAnchorKey()
        const content = editorState.getCurrentContent()
        const currentContentBlock = content.getBlockForKey(anchorKey)
        const contentBlockType = currentContentBlock.getType()

        // Others can get from selection
        // see https://draftjs.org/docs/api-reference-selection-state

        return {
            type: contentBlockType,
            style: currentInlineStyle
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
                name: 'ITALIC',
                type: 'BLOCKSTYLING',
                icon: ItalicIcon,
                isActive: blockInfo.style.has('ITALIC')
            },
            {
                name: 'header-two',
                type: 'BLOCKTYPE',
                icon: TitleIcon,
                isActive: blockInfo.type === 'header-two'
            },
            {
                name: 'header-three',
                type: 'BLOCKTYPE',
                icon: TitleIcon,
                iconProps: { size: 20 },
                isActive: blockInfo.type === 'header-three'
            },
            {
                name: 'blockquote',
                type: 'BLOCKTYPE',
                icon: QuoteIcon,
                isActive: blockInfo.type === 'blockquote'
            }
        ]

        return list
    }, [blockInfo])

    const [position, { set: setPosition }] = useHash({
        top: 0,
        left: 0
    })

    /**
     * check if toolbar should show
     * and where it should in
     */
    useEffect(() => {
        const selectionState = editorState.getSelection()

        if (selectionState.isCollapsed() || !selectionState.getHasFocus()) {
            onClose()
            return
        }

        const nativeSelection = window.getSelection()

        if (!nativeSelection) {
            return
        }

        /**
         * TODO:
         * Range.getBoundingClientRect
         * this api is an experimental techonlogy
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Range/getBoundingClientRect
         */
        const rangeRect = nativeSelection.getRangeAt(0).getBoundingClientRect()

        setPosition({
            top: rangeRect.top,
            left: rangeRect.left + rangeRect.width / 2
        })
        onOpen()
    }, [editorState, onClose, onOpen, setPosition])

    return (
        <ul
            className={classes.root}
            style={{ display: show ? '' : 'none', ...position }}
        >
            {buttonList.map(info => (
                <li className={classes.li} key={info.name}>
                    <button
                        className={classes.button}
                        onClick={handleButtonClick}
                        data-type={info.type}
                        data-name={info.name}
                    >
                        <info.icon
                            color={info.isActive ? 'green' : '#fff'}
                            {...info.iconProps}
                        />
                    </button>
                </li>
            ))}
        </ul>
    )
}
