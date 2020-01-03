import { useMethods } from './useMethods'

const booleanMethods = {
    toggle: (state: boolean) => !state,
    setTrue: () => true,
    setFalse: () => false
}

export const useBoolean = (initialValue: boolean = false) =>
    useMethods(initialValue, booleanMethods)
