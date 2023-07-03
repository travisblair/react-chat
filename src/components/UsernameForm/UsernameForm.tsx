import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  QuerySnapshot,
} from 'firebase/firestore';
import firestore from '../../firebase/firebase';

import ErrorMessage from '../ErrorMessage';

import './UsernameForm.css';

interface UsernameFormProps {
  onUsernameSubmit: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!username || !username.length) {
        setErrorMessage('Please enter a username.');
        return;
      }

      const usernameRef = collection(firestore, 'usernames');
      const q = query(usernameRef, where('username', '==', username.toLowerCase()));
      const querySnapshot: QuerySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage('Username already exists. Please choose a different one.');
        return;
      }

      onUsernameSubmit(username);
    },
    [username, onUsernameSubmit]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value: string = event.target.value.trim();
      setUsername(value);
      setErrorMessage('');
    },
    []
  );

  return (
    <div className="UsernameForm">
      <h2 className="UsernameForm_title">Enter your username</h2>
      <form onSubmit={handleSubmit} className="UsernameForm_form">
        <div className="UsernameForm_inputGroup">
          <input
            type="text"
            value={username}
            onChange={handleChange}
            className={`UsernameForm_input ${errorMessage ? 'error' : ''}`}
          />
          <button
            type="submit"
            className={`UsernameForm_btn ${errorMessage ? 'error' : ''}`}
          >
            Submit
          </button>
        </div>
      </form>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default UsernameForm;
