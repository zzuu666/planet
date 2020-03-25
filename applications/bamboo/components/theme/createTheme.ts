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
    const megredOption = {
        ...options,
        ...defaultOptions
    }

    const spacing = createSpacing(megredOption.spacing || 8)
    const breakpoints = createBreakpoints()
    const typography = createTypography()
    const globalStylePrefix = megredOption.globalStylePrefix
    const palette = createPalette()

    return {
        palette,
        spacing,
        breakpoints,
        typography,
        globalStylePrefix
    }
}
