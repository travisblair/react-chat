import React, { ErrorInfo, ReactNode } from 'react'
import ErrorMessage from '../../../ErrorMessage'

interface ChatroomErrorBoundaryProps {
  children: ReactNode
}

interface ChatroomErrorBoundaryState {
  hasError: boolean
}

class ChatroomErrorBoundary extends React.Component<
  ChatroomErrorBoundaryProps,
  ChatroomErrorBoundaryState
> {
  constructor(props: ChatroomErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ChatroomErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage message="Error: Failed to load chat room!" />
    }

    return this.props.children
  }
}

export default ChatroomErrorBoundary
