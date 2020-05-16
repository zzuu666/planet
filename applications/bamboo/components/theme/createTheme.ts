import { IPlanetTheme } from './index'
import { createSpacing } from './createSpacing'
import { createBreakpoints } from './createBreakpoints'
import { createTypography } from './createTypography'
import { createPalette } from './createPalette'

interface ICreateThemeOptions {
    spacing?: number
    globalStylePrefix?: string
}

const defaultOptions: ICreateThemeOptions = {
    spacing: 8,
    globalStylePrefix: 'planet'
}

export const createTheme = (
    options: ICreateThemeOptions = {}
): IPlanetTheme => {
    const mergedOption = {
        ...options,
        ...defaultOptions
    }

    const spacing = createSpacing(mergedOption.spacing || 8)
    const breakpoints = createBreakpoints()
    const typography = createTypography()
    const globalStylePrefix = mergedOption.globalStylePrefix
    const palette = createPalette()

    return {
        theme: 'light',
        palette,
        spacing,
        breakpoints,
        typography,
        globalStylePrefix
    }
}
