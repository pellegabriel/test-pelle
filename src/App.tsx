import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';

interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
}

interface MessagesByRoom {
  [key: string]: string[];
}

const App: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<string>('Room 1');
  const [messages, setMessages] = useState<MessagesByRoom>({
    'Room 1': [],
    'Room 2': [],
    'Room 3': []
  });
  const [users, setUsers] = useState<User[]>([]);

  const addMessage = (room: string, message: string) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [room]: [...prevMessages[room], message]
    }));
  };

  const addUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const newUser = response.data.results[0];
      const user: User = {
        uuid: newUser.login.uuid,
        name: `${newUser.name.first} ${newUser.name.last}`,
        avatar: newUser.picture.thumbnail,
        room: `Room ${users.length + 4}`,
      };
      setUsers(prevUsers => [...prevUsers, user]);
      setMessages(prevMessages => ({
        ...prevMessages,
        [user.room]: []
      }));
    } catch (error) {
      console.error('Error fetching new user:', error);
    }
  };

  const rooms: string[] = ['Room 1', 'Room 2', 'Room 3', ...users.map(user => user.room)];

  return (
    <Container>
      <ChatRoomList rooms={rooms} users={users} setCurrentRoom={setCurrentRoom} />
      <ChatRoom room={currentRoom} messages={messages[currentRoom]} addMessage={addMessage} />
      <AddUserButton onClick={addUser}>Add User</AddUserButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const AddUserButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default App;
