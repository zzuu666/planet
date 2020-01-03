import React, {
    FC,
    DetailedHTMLProps,
    ButtonHTMLAttributes,
    ElementType,
    useMemo
} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { buttonStyle } from './commonStyles'
import { SvgIconFactory } from './SvgIcon'

const useStyles = makeStyles({
    root: {
        ...buttonStyle,
        display: 'flex',
        border: '2px solid #555',
        borderRadius: '50%',
        padding: 4
    }
})

interface IIconButtonProps {
    icon: ElementType
}

type IconButtonProsp = IIconButtonProps &
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >

export const IconButton: FC<IconButtonProsp> = props => {
    const { icon: Icon, className, ...others } = props

    const classes = useStyles()

    const SvgIcon = useMemo(() => SvgIconFactory(Icon), [Icon])

    return (
        <button className={clsx(classes.root, className)} {...others}>
            <SvgIcon size={24} color="#555" />
        </button>
    )
}

IconButton.displayName = 'IconButton'
