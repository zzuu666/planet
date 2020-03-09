import { createTheme } from './createTheme'
import { SpacingFuntion } from './createSpacing'
import { IThemeBreakpoints } from './createBreakpoints'
import { TypographyTheme } from './createTypography'

export interface IPlanetTheme {
    spacing: SpacingFuntion
    breakpoints: IThemeBreakpoints
    typography: TypographyTheme
}

export { createTheme }
