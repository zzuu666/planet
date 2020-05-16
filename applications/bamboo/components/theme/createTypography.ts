type VariantType =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'title'
    | 'subtitle'
    | 'p'
    | 'subp'
    | 'smalltitle'
    | 'description'

interface TypographyConfig {
    fontSize: number
    lineHeight: number
    fontWeight: number
}

export type TypographyTheme = Record<VariantType, TypographyConfig>

type CreateTypographyFunction = () => TypographyTheme

const typoTypoFontSizeMap: Record<VariantType, number> = {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    title: 24,
    subtitle: 20,
    p: 14,
    subp: 12,
    smalltitle: 16,
    description: 14
}

const boldTypo = ['h1', 'h2', 'h3', 'h4', 'title', 'smalltitle']

export const createTypography: CreateTypographyFunction = () => {
    const result = Object.entries(typoTypoFontSizeMap).reduce(
        (current, [type, size]) => {
            current[type] = {
                fontSize: size,
                lineHeight: `${size + 8}px`,
                fontWeight: boldTypo.includes(type) ? 900 : ''
            }
            return current
        },
        {} as Record<VariantType, TypographyConfig>
    )

    return result
}
