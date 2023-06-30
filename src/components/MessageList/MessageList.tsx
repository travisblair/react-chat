import React from 'react'
import { Firestore } from 'firebase/firestore'
import { formatTimestamp } from '../../utils'
import { useCollectionFetcher, useAutoScroll } from '../../hooks'

import ErrorMessage from '../ErrorMessage'

import './MessageList.css'

interface Message {
  timestamp: number
  username: string
  text: string
}

interface MessageListProps {
  firestore: Firestore
}

const MessageList: React.FC<MessageListProps> = ({ firestore }) => {
  const [data, error] = useCollectionFetcher(firestore, 'messages')
  const messages = data.map((doc) => doc as Message)
  const messagesRef = useAutoScroll(messages)

  if (error) {
    return (
      <ErrorMessage>
        <p>Something went wrong: Unable to load chat room messages.</p>
        <p>Please refresh your browser</p>
      </ErrorMessage>
    )
  }

  const sortedMessages = messages.sort(
    (a: Message, b: Message) => a.timestamp - b.timestamp
  )

  return (
    <div className="MessageList_container" ref={messagesRef}>
      <ul className="MessageList_messages">
        {sortedMessages.map((message: Message) => (
          <li key={message.timestamp} className="MessageList_message">
            <div className="MessageList_sender">
              {message.username} - {formatTimestamp(message.timestamp)}
            </div>
            <div className="MessageList_text">{message.text}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MessageList
