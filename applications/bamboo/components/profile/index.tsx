import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { Image } from '../image'
import { IPlanetTheme } from '../theme/index'
import { Typography } from '../typography'

interface IProfileProps {
    avatar: string
    main: string
    desc: string
}

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    flex: {
        flex: '1 0 auto'
    },
    image: {
        marginRight: theme.spacing(1)
    }
}))

export const Profile: FC<IProfileProps> = props => {
    const { avatar, main, desc } = props
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Image
                around
                alt="avatar"
                width="56px"
                src={avatar}
                className={classes.image}
            />
            <div className={classes.flex}>
                <Typography variant="smalltitle">{main}</Typography>
                <Typography>{desc}</Typography>
            </div>
        </div>
    )
}
