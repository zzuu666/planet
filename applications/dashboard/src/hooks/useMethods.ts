import { useState, useMemo } from 'react'

export const useMethods = <T, S extends Object>(
    initialValue: T,
    methods: Record<keyof S, (value: T, ...args: any[]) => T>
): [T, Record<keyof S, (...args: any[]) => React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(initialValue)

    const boundMethods = useMemo(
        () =>
            Object.entries(methods).reduce((result, [name, fn]) => {
                const method = (...args: any[]) =>
                    setValue(prevValue => fn(prevValue, ...args))

                result[name] = method

                return result
            }, Object.create(null)),
        [methods]
    )

    return [value, boundMethods]
}
