import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'

import './ChatInput.css'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const trimmedMessage = message.trim()
      if (trimmedMessage === '') {
        return
      }
      onSendMessage(trimmedMessage)
      setMessage('')
    },
    [message, onSendMessage]
  )

  return (
    <form onSubmit={handleSubmit} className="ChatInput">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Enter your message..."
        className="ChatInput_input"
      />
      <button type="submit" className="ChatInput_btn">
        Send
      </button>
    </form>
  )
}

export default ChatInput
