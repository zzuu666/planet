import { useMethods } from './useMethods'

const stringMethods = {
    set(prevState: string, value: string) {
        return value
    }
}

export const useString = (initialValue = '') =>
    useMethods(initialValue, stringMethods)
