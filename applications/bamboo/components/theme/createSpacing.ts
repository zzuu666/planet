export type SpacingFuntion = (value: number) => string | number

export const createSpacing = (options: number): SpacingFuntion => value =>
    options * value
