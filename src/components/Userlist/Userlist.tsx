import React from 'react'
import { Firestore, DocumentData } from 'firebase/firestore'
import { useCollectionFetcher, useAutoScroll } from '../../hooks'

import './Userlist.css'

interface User {
  username: string
}

interface UserlistProps {
  firestore: Firestore
}

const Userlist: React.FC<UserlistProps> = ({ firestore }) => {
  const [data, error] = useCollectionFetcher(firestore, 'usernames')
  const users: User[] = data.map((doc: DocumentData) => doc as User)
  const usersRef = useAutoScroll(users)

  const sortedUsers = users.sort((a: User, b: User) =>
    a.username.localeCompare(b.username)
  )

  if (error) {
    return (
      <div className="error">
        Something went wrong: Failed to fetch user list
      </div>
    )
  }

  return (
    <div className="Userlist_container" ref={usersRef}>
      <ul className="Userlist_user">
        {sortedUsers.map((user: User, index: number) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default Userlist
