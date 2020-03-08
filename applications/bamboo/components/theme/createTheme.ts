import { IPlanetTheme } from './index'
import { createSpacing } from './createSpacing'
import { createBreakpoints } from './createBreakpoints'

interface ICreateThemeOptions {
    spacing?: number
}

const defaultOptions: ICreateThemeOptions = {
    spacing: 8
}

export const createTheme = (
    options: ICreateThemeOptions = defaultOptions
): IPlanetTheme => {
    const spacing = createSpacing(options.spacing || 8)
    const breakpoionts = createBreakpoints()

    return {
        spacing,
        breakpoionts
    }
}
