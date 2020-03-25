import React, { FC, useMemo } from 'react'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { IPlanetTheme } from '../theme'

export type VariantType =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'title'
    | 'subtitle'
    | 'p'
    | 'subp'
    | 'smalltitle'
    | 'description'

type ComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

type TypographyColorType = 'primary' | 'secondary'
interface ITypographyProps
    extends React.ParamHTMLAttributes<HTMLParagraphElement> {
    variant?: VariantType
    component?: ComponentType
    gutter?: number
    color?: TypographyColorType
    clamp?: number
}

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    typography: props => ({
        ...theme.typography[props.variant]
    }),
    gutter: props => ({
        marginBottom: props.gutter
            ? theme.spacing(props.gutter) + 'px'
            : undefined
    }),
    'color-primary': {
        color: theme.palette.text.primary
    },
    'color-secondary': {
        color: theme.palette.text.secondary
    },
    clamp: {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical'
    },
    'clamp-1': {
        '-webkit-line-clamp': 1
    },
    'clamp-2': {
        '-webkit-line-clamp': 2
    }
}))

const variantMap: Record<VariantType, ComponentType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    title: 'h3',
    subtitle: 'h4',
    p: 'p',
    subp: 'p',
    smalltitle: 'h4',
    description: 'p'
}
// Todo Props should pass with FC
export const Typography: FC<ITypographyProps> = (props: ITypographyProps) => {
    const {
        variant = 'p',
        component,
        gutter,
        color = 'primary',
        clamp,
        children,
        ...others
    } = props

    const classes = useStyles({ variant, gutter })

    const Component: ComponentType = component ? component : variantMap[variant]

    const componentClass = useMemo(
        () =>
            clsx(classes.typography, classes[`color-${color}`], {
                [classes.gutter]: gutter,
                [classes.clamp]: clamp,
                [classes[`clamp-${clamp}`]]: clamp
            }),
        [classes, color, clamp, gutter]
    )

    return (
        <Component className={componentClass} {...others}>
            {children}
        </Component>
    )
}
