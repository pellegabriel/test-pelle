import React, { useState } from "react";
import axios from "axios";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import ChatRoomList from "./components/ChatRoomList/ChatRoomList";
import {
  AddUserButton,
  Container,
  MainContent,
  Sidebar,
  UserAvatar,
  UserDescription,
  UserDetails,
  UserHeader,
  UserName,
  UserTimezone,
} from "./App.styles";
interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  timezone: string;
  description: string;
  lastConnection: string;
  lastMessage: string;
}

interface MessagesByRoom {
  [key: string]: { user: User; message: string }[];
}

const App = () => {
  const [currentRoom, setCurrentRoom] = useState<string>("Room 1");
  const [messages, setMessages] = useState<MessagesByRoom>({
    "Room 1": [],
    "Room 2": [],
    "Room 3": [],
  });
  const [users, setUsers] = useState<User[]>([]);

  const addMessage = (room: string, message: string, user: User) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [room]: [...prevMessages[room], { user, message }],
    }));
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.uuid === user.uuid ? { ...u, lastMessage: message } : u
      )
    );
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
        timezone: newUser.location.timezone.description,
        description: newUser.location.street.name,
        lastConnection: newUser.registered.date,
        lastMessage: "",
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
          messages={messages}
          setCurrentRoom={setCurrentRoom}
        />
        <AddUserButton onClick={addUser}>+ Create New</AddUserButton>
      </Sidebar>
      <MainContent>
        {currentUser && (
          <UserHeader>
            <UserAvatar src={currentUser.avatar} alt={currentUser.name} />
            <UserDetails>
              <UserName>{currentUser.name}</UserName>
              <UserDescription>{currentUser.description}</UserDescription>
              <UserTimezone>{currentUser.timezone}</UserTimezone>
            </UserDetails>
          </UserHeader>
        )}
        <ChatRoom
          room={currentRoom}
          messages={messages[currentRoom]}
          addMessage={(message) =>
            currentUser && addMessage(currentRoom, message, currentUser)
          }
        />
      </MainContent>
    </Container>
  );
};

export default App;
