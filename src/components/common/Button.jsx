import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  onClick,
  size,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const classes =
    `btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`.trim()

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
