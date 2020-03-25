import { createTheme } from './createTheme'
import { SpacingFuntion } from './createSpacing'
import { IThemeBreakpoints } from './createBreakpoints'
import { TypographyTheme } from './createTypography'
import { IThemePalette } from './createPalette'

export interface IPlanetTheme {
    spacing: SpacingFuntion
    breakpoints: IThemeBreakpoints
    typography: TypographyTheme
    globalStylePrefix: string
    palette: IThemePalette
}

export { createTheme }
