import classNames from 'classnames';
import React from 'react'

export default function Typography(props) {
  const { type: Component = 'p', bold, size = 'md', children } = props;
  const cls = classNames({
    'bold': bold,
  }, `font_${size}`, 'typography')
  return (
    <Component className={cls}>
      {children}
    </Component>
  )
}
