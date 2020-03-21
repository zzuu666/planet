import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { IPlanetTheme } from '../theme'

type BreakPointType =
    | boolean
    | 'auto'
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12

interface IGridProps extends React.HTMLAttributes<HTMLDivElement> {
    xs?: BreakPointType
    sm?: BreakPointType
    md?: BreakPointType
    lg?: BreakPointType
    xl?: BreakPointType
    spacing?: number
    container?: boolean
    item?: boolean
    direction?: 'column' | 'row'
}

const GRID_SIZES: BreakPointType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const hackJSSIssue = (
    globalStyles,
    theme: IPlanetTheme,
    styles: Record<string, object>,
    breakpoints
) => {
    Object.entries(styles).forEach(([key, value]) => {
        globalStyles[key] = {
            [theme.breakpoints.up(breakpoints)]: value
        }
    })
}

const generateGrid = (globalStyles, theme: IPlanetTheme, breakpoint) => {
    const styles = {}

    for (let i = 0, len = GRID_SIZES.length; i < len; i += 1) {
        const size = GRID_SIZES[i]

        const key = `grid-${breakpoint}-${size}`

        if (size === false) continue

        if (size === true) {
            // For the auto layouting
            styles[key] = {
                flexBasis: 0,
                flexGrow: 1,
                maxWidth: '100%'
            }
            continue
        }

        if (size === 'auto') {
            styles[key] = {
                flexBasis: 'auto',
                flexGrow: 0,
                maxWidth: 'none'
            }
            continue
        }

        // Keep 7 significant numbers.
        const width = `${Math.round((size / 12) * 10e7) / 10e5}%`

        // Close to the bootstrap implementation:
        // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
        styles[key] = {
            flexBasis: width,
            flexGrow: 0,
            maxWidth: width
        }
    }

    // No need for a media query for the first size.
    if (breakpoint === 'xs') {
        Object.assign(globalStyles, styles)
    } else {
        /**
         * Todo remove hackJssIssue
         *
         * there is an issus https://github.com/cssinjs/jss/issues/1288
         * when use `@media` in hooks
         */
        // globalStyles[theme.breakpoints.up(breakpoint)] = styles

        hackJSSIssue(globalStyles, theme, styles, breakpoint)
    }
}

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function getOffset(val, div = 1) {
    const parse = parseFloat(val)
    return `${parse / div}${String(val).replace(String(parse), '') || 'px'}`
}

function generateGutter(theme, breakpoint) {
    const styles = {}

    SPACINGS.forEach(spacing => {
        const themeSpacing = theme.spacing(spacing)

        if (themeSpacing === 0) {
            return
        }

        styles[`spacing-${breakpoint}-${spacing}`] = {
            marginRight: `-${getOffset(themeSpacing, 2)}`,
            marginLeft: `-${getOffset(themeSpacing, 2)}`,
            width: `calc(100% + ${getOffset(themeSpacing)})`,
            '& > $item': {
                paddingLeft: getOffset(themeSpacing, 2),
                paddingRight: getOffset(themeSpacing, 2)
            }
        }
    })

    return styles
}

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    root: {},
    /* Styles applied to the root element if `container={true}`. */
    container: {
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    /* Styles applied to the root element if `item={true}`. */
    item: {
        boxSizing: 'border-box',
        margin: '0' // For instance, it's useful when used with a `figure` element.
    },
    /* Styles applied to the root element if `direction="column"`. */
    'direction-xs-column': {
        flexDirection: 'column'
    },
    ...theme.breakpoints.keys.reduce((accumulator, key) => {
        // Use side effect over immutability for better performance.
        generateGrid(accumulator, theme, key)
        return accumulator
    }, {}),
    ...generateGutter(theme, 'xs')
}))

export const Grid: FC<IGridProps> = props => {
    const {
        xs,
        sm,
        md,
        lg,
        xl,
        container,
        item,
        spacing,
        children,
        className,
        direction
    } = props

    const classes = useStyles()

    const gridClassName = clsx(className, {
        [classes.container]: container && !item,
        [classes.item]: item,
        [classes[`spacing-xs-${String(spacing)}`]]: container && !item,
        [classes[`direction-xs-${String(direction)}`]]: direction !== 'row',
        [classes[`grid-xs-${String(xs)}`]]: xs !== false,
        [classes[`grid-sm-${String(sm)}`]]: sm !== false,
        [classes[`grid-md-${String(md)}`]]: md !== false,
        [classes[`grid-lg-${String(lg)}`]]: lg !== false,
        [classes[`grid-xl-${String(xl)}`]]: xl !== false
    })

    return <div className={gridClassName}>{children}</div>
}

Grid.defaultProps = {
    container: true,
    spacing: 0,
    direction: 'row',
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
}
