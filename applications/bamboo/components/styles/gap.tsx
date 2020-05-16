import { FC } from 'react'
import { createUseStyles } from 'react-jss'
import { IPlanetTheme } from '../theme'

const GAP_POSITION = ['top', 'right', 'bottom', 'left']
const GAP_SIZE = ['xs', 'sm', 'md', 'lg', 'xl']

const generateStyles = (theme: IPlanetTheme) => {
    const styles = {}
    const prefix = theme.globalStylePrefix

    for (let i = 0, len = GAP_POSITION.length; i < len; i += 1) {
        for (let j = 0, jlen = GAP_SIZE.length; j < jlen; j += 1) {
            const gap = GAP_SIZE[j] === 'xs' ? 0.5 : j
            styles[`${prefix}-gap-${GAP_POSITION[i]}-${GAP_SIZE[j]}`] = {
                [`margin-${GAP_POSITION[i]}`]: theme.spacing(gap)
            }
        }
    }

    return styles
}

const useStyles = createUseStyles<IPlanetTheme>(theme => ({
    '@global': generateStyles(theme)
}))

export const GapGlobalStyles: FC = props => {
    useStyles()
    return null
}
