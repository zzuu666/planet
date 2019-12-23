import React, {FC} from 'react'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles<{status: { danger: string }}>(theme => ({
    text: {
        color: theme.status.danger
    }
}))

export const HomePage: FC = props => {
    const classes = useStyles({});

    return (
        <div>Theme<span className={classes.text}>test</span></div>
    )
}


