import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

type ImageRatio = '1x1' | '16x9'

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    around?: boolean
    /* for a11y so required */
    alt: string
    ratio?: ImageRatio
    width?: string
}

const ratioToPadding = (ratio: ImageRatio) => {
    return ratio === '1x1' ? '100%' : ratio === '16x9' ? '56.25%' : '100%'
}

const useStyles = createUseStyles(theme => ({
    container: {
        position: 'relative',
        borderRadius: props => (props.around ? '50%' : ''),
        width: props => props.width || '100%',
        overflow: 'hidden'
    },
    inner: {
        position: 'relative',
        paddingBottom: props => ratioToPadding(props.ratio),
        width: '100%'
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
}))

export const Image: FC<IImageProps> = props => {
    const { around, alt, className, ...others } = props
    const classes = useStyles(props)

    return (
        <div className={clsx(classes.container, className)}>
            <div className={classes.inner}>
                <img className={classes.img} alt={alt} {...others} />
            </div>
        </div>
    )
}

Image.defaultProps = {
    ratio: '1x1',
    around: false
}
