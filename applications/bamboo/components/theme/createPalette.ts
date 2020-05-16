interface IBaseColor {
    light: string
    main: string
    dark: string
    contrastText: string
}

interface IPhaseColor {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
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
    gray: IPhaseColor
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
        gray: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#d5d5d5',
            A200: '#aaaaaa',
            A400: '#303030',
            A700: '#616161'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)'
        }
    }
}
