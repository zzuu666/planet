import React from 'react'

export default function createSvgIcon(path, displayName) {
    const Component = React.memo(
        React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
            (props, ref) => (
                <svg ref={ref} viewBox="0 0 24 24" {...props}>
                    {path}
                </svg>
            )
        )
    )

    if (process.env.NODE_ENV !== 'production') {
        Component.displayName = `${displayName}Icon`
    }

    return Component
}
