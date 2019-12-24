import { KeyboardEvent } from 'react'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
const { hasCommandModifier, isOptionKeyCommand, isCtrlKeyCommand } = KeyBindingUtil

export const keyBindingFn = (event: KeyboardEvent) => {
    console.log(event.keyCode, isOptionKeyCommand(event))
    /* `S` key */
    if (event.keyCode === 83 && hasCommandModifier(event)) {
        return 'myeditor-save'
    }

    return getDefaultKeyBinding(event)
}
