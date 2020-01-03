import { useMethods } from './useMethods'

const hashMethods = {
    set: <T extends Object>(state: T, newState: T) => ({ ...newState }),
    merge: <T extends Object>(state: T, newState: T) => ({
        ...state,
        ...newState
    })
}

export const useHash = <T extends Object>(
    initialValue: T = Object.create(null)
) => useMethods(initialValue, hashMethods)
