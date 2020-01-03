import React, { FC, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        zIndex: 100
    }
})

interface IModalProps {
    show: boolean
    onClose: () => void
}

export const Modal: FC<IModalProps> = props => {
    const { children, show, onClose } = props

    const classes = useStyles()

    const container = useMemo(() => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        return div
    }, [])

    useEffect(() => {
        return () => {
            document.body.removeChild(container)
        }
    }, [container])

    if (!show) return null

    return ReactDOM.createPortal(
        <div className={classes.root}>{children}</div>,
        container
    )
}
