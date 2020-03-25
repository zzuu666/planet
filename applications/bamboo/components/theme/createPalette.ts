interface IBaseColor {
    light: string
    main: string
    dark: string
    contrastText: string
}

interface ITextColor {
    primary: string
    secondary: string
    disabled: string
}

export interface IThemePalette {
    type: 'light' | 'dark'
    primary: IBaseColor
    secondary: IBaseColor
    text: ITextColor
}

export const createPalette = (): IThemePalette => {
    return {
        type: 'light',
        primary: {
            light: '#ffadb0',
            main: '#ef7c81',
            dark: '#b94c55',
            contrastText: '#fff'
        },
        secondary: {
            light: '#5dd9b4',
            main: '#1ba784',
            dark: '#007757',
            contrastText: '#fff'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)'
        }
    }
}
