import React, { ReactNode } from 'react'
import classNames from 'classnames'

import './ErrorMessage.css'

interface ErrorMessageProps {
  message?: string
  customClasses?: string
  children?: ReactNode
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  customClasses,
  children,
}) => {
  const errorClasses = classNames('error', customClasses)
  return (
    <div className={errorClasses}>
      {message}
      {children && children}
    </div>
  )
}

export default ErrorMessage
