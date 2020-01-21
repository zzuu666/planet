import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { Typora } from '../../components/typora'
import { ITheme } from '../../App'

/**
 * jss createUseStyles can't infer result type
 * so I just use this method.
 *
 * https://github.com/cssinjs/jss/issues/1203
 */
const styles = (theme: ITheme) => ({
    text: {
        color: theme.status.danger
    }
})

const useStyles = createUseStyles<keyof ReturnType<typeof styles>>(styles)

export const HomePage: FC = props => {
    const classes = useStyles()

    return (
        <div>
            Theme<span className={classes.text}>test</span>
            <Typora />
        </div>
    )
}
