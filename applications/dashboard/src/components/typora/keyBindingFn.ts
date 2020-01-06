import { KeyboardEvent } from 'react'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'

import { EditorCommand } from './editorCommand'

const {
    hasCommandModifier,
    isOptionKeyCommand,
    isCtrlKeyCommand
} = KeyBindingUtil

export const keyBindingFn = (event: KeyboardEvent): EditorCommand | null => {
    /* `S` key */
    if (event.keyCode === 83 && hasCommandModifier(event)) {
        return 'save'
    }

    return getDefaultKeyBinding(event)
}
