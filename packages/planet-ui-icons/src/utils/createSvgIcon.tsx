import React from 'react';

export default function createSvgIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <svg ref={ref} {...props}>
        {path}
      </svg>
    )),
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}Icon`;
  }

  return Component;
}
