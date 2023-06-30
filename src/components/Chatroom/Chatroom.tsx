import React, { useState, useCallback } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import firestore from '../../firebase/firebase'

import UsernameForm from '../UsernameForm'
import ChatInput from '../ChatInput'
import MessageList from '../MessageList'
import Userlist from '../Userlist'
import ChatroomErrorBoundary from './components/ChatroomErrorBoundary'

import './Chatroom.css'

const ChatRoom: React.FC = () => {
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username')
  })

  const handleSendMessage = useCallback(
    async (message: string) => {
      try {
        await addDoc(collection(firestore, 'messages'), {
          text: message,
          timestamp: Date.now(),
          username: username!,
        })
      } catch (error) {
        console.error('Error adding message:', error)
      }
    },
    [username]
  )

  const handleUsernameSubmit = useCallback(async (newUsername: string) => {
    try {
      await addDoc(collection(firestore, 'usernames'), {
        username: newUsername,
      })
      setUsername(newUsername)
      localStorage.setItem('username', newUsername)
    } catch (error) {
      console.error('Error adding username:', error)
    }
  }, [])

  if (!username) {
    return (
      <ChatroomErrorBoundary>
        <UsernameForm onUsernameSubmit={handleUsernameSubmit} />
      </ChatroomErrorBoundary>
    )
  }

  return (
    <div className="Chatroom">
      <ChatroomErrorBoundary>
        <div className="Chatroom_messages_container">
          <MessageList firestore={firestore} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
        <Userlist firestore={firestore} />
      </ChatroomErrorBoundary>
    </div>
  )
}

export default ChatRoom
