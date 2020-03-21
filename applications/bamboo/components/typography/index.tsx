import React, { FC } from 'react'
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
interface ITypographyProps
    extends React.ParamHTMLAttributes<HTMLParagraphElement> {
    variant: VariantType
    component: ComponentType
}

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    typography: props => ({
        ...theme.typography[props.variant]
    })
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
export const Typography: FC<{ variant?: VariantType }> = (
    props: ITypographyProps
) => {
    const { variant = 'p', component, children, ...others } = props

    const classes = useStyles({ variant })

    const Component: ComponentType = component ? component : variantMap[variant]

    return (
        <Component className={classes.typography} {...others}>
            {children}
        </Component>
    )
}
