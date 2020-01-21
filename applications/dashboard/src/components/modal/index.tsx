import React, { FC, useMemo, useEffect, MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
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
    confirmText?: string
    cancelText?: string
    onClose?: () => void
    onConfirm?: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel?: (event?: MouseEvent<HTMLButtonElement>) => void
}

export const Modal: FC<IModalProps> = props => {
    const {
        children,
        show,
        confirmText,
        cancelText,
        onClose,
        onCancel,
        onConfirm
    } = props

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
        <div className={classes.root}>
            {children}
            <div>
                <button onClick={onConfirm}>{confirmText}</button>
                <button onClick={onCancel}>{cancelText}</button>
            </div>
        </div>,
        container
    )
}

Modal.defaultProps = {
    cancelText: '取消',
    confirmText: '确认'
}
