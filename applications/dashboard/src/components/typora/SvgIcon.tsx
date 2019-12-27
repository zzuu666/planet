import React, { FC, ElementType, ReactElement } from 'react'

export const SvgIcon: FC = (props) => {
    const { children } = props

    console.log(children);

    const NewSvg = React.cloneElement(children as ReactElement, {
        viewBox: '0 0 24 24'
    })



    return NewSvg
}

interface ISvgIconProps {
    style?: React.CSSProperties;
    color?: string;
}

export const SvgIconFactory = (Component: ElementType): FC<ISvgIconProps> => props => {
    const { style, color, ...others } = props

    return <Component viewBox="0 0 24 24" style={{ height: 16, width: 16, fill: color, ...style }} {...others} />
}
