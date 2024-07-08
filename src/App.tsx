import React, { useState } from "react";
import axios from "axios";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import ChatRoomList from "./components/ChatRoomList/ChatRoomList";
import { AddUserButton, Container, MainContent, Sidebar, UserAvatar, UserHeader, UserName } from "./App.styles";
interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
}

interface MessagesByRoom {
  [key: string]: string[];
}

const App = () => {
  const [currentRoom, setCurrentRoom] = useState<string>("Room 1");
  const [messages, setMessages] = useState<MessagesByRoom>({
    "Room 1": [],
    "Room 2": [],
    "Room 3": [],
  });
  const [users, setUsers] = useState<User[]>([]);

  const addMessage = (room: string, message: string) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [room]: [...prevMessages[room], message],
    }));
  };

  const addUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const newUser = response.data.results[0];
      const user: User = {
        uuid: newUser.login.uuid,
        name: `${newUser.name.first} ${newUser.name.last}`,
        avatar: newUser.picture.thumbnail,
        room: `Room ${users.length + 4}`,
      };
      setUsers((prevUsers) => [...prevUsers, user]);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [user.room]: [],
      }));
    } catch (error) {
      console.error("Error fetching new user:", error);
    }
  };

  const rooms: string[] = [
    "Room 1",
    "Room 2",
    "Room 3",
    ...users.map((user) => user.room),
  ];

  const currentUser = users.find((user) => user.room === currentRoom);

  return (
    <Container>
      <Sidebar>
        <ChatRoomList
          rooms={rooms}
          users={users}
          setCurrentRoom={setCurrentRoom}
        />
        <AddUserButton onClick={addUser}>+ Create New</AddUserButton>
      </Sidebar>
      <MainContent>
        {currentUser && (
          <UserHeader>
            <UserAvatar src={currentUser.avatar} alt={currentUser.name} />
            <UserName>{currentUser.name}</UserName>
          </UserHeader>
        )}
        <ChatRoom
          room={currentRoom}
          messages={messages[currentRoom]}
          addMessage={addMessage}
        />
      </MainContent>
    </Container>
  );
};

export default App;
