type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ICreateBreakpointsOptions {
    values?: Record<Breakpoint, number>
    unit?: 'px'
}

const defaultOptions: ICreateBreakpointsOptions = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920
    },
    unit: 'px'
}

type UpFunction = (key: Breakpoint) => string
type GetFunction = (key: Breakpoint) => number

export interface IThemeBreakpoints {
    up: UpFunction
    get: GetFunction
}

type CreateBreakpointsFunction = (
    options?: ICreateBreakpointsOptions
) => IThemeBreakpoints

export const createBreakpoints: CreateBreakpointsFunction = (
    options = defaultOptions
) => {
    const {
        values = defaultOptions.values,
        unit = defaultOptions.unit
    } = options

    const up: UpFunction = key => `@media (min-width:${values[key]}${unit})`

    const get: GetFunction = key => values[key]

    return {
        up,
        get
    }
}
