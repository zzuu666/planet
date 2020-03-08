import { createTheme } from './createTheme'
import { SpacingFuntion } from './createSpacing'
import { IThemeBreakpoints } from './createBreakpoints'

export interface IPlanetTheme {
    spacing: SpacingFuntion
    breakpoionts: IThemeBreakpoints
}

export { createTheme }
