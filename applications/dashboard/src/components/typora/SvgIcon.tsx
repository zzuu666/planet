import React, { FC, ElementType, ReactElement } from 'react'

export const SvgIcon: FC = (props) => {
    const { children } = props

    const NewSvg = React.cloneElement(children as ReactElement, {
        viewBox: '0 0 24 24'
    })

    return NewSvg
}

export interface ISvgIconProps {
    style?: React.CSSProperties;
    color?: string;
    size?: number;
}

export const SvgIconFactory = (Component: ElementType): FC<ISvgIconProps> => props => {
    const { style, color, size = 24, ...others } = props

    return <Component viewBox="0 0 24 24" style={{ height: size, width: size, fill: color, ...style }} {...others} />
}
