import { useCallback, ChangeEvent } from 'react'
import { useString } from './useString'

type InputChangeCallback = (event: ChangeEvent<HTMLInputElement>) => void

export const useInput = (initilaValue = ''): [string, InputChangeCallback] => {
    const [value, { set }] = useString(initilaValue)

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const inputValue = event.currentTarget.value
            set(inputValue)
        },
        [set]
    )

    return [value, handleChange]
}
