import React, { useState, useEffect } from "react";
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
import LogoHeader from "./components/ChatRoomList/LogoHeader";
import { GlobalStyle } from "./global.styles";
import { FaPlus } from "react-icons/fa";

interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  timezone: string;
  description: string;
  lastConnection: string;
  lastMessage: string;
  isCurrentUser: boolean;
}

interface MessagesByRoom {
  [key: string]: { user: User; message: string }[];
}

const App = () => {
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [messages, setMessages] = useState<MessagesByRoom>({});
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

  const fetchUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const newUser = response.data.results[0];
      return {
        uuid: newUser.login.uuid,
        name: `${newUser.name.first} ${newUser.name.last}`,
        avatar: newUser.picture.thumbnail,
        room: newUser.login.uuid,
        timezone: newUser.location.timezone.description,
        description: newUser.location.street.name,
        lastConnection: newUser.registered.date,
        lastMessage: "",
        isCurrentUser: false,
      };
    } catch (error) {
      console.error("Error fetching new user:", error);
      return null;
    }
  };

  const addUser = async () => {
    const user = await fetchUser();
    if (user) {
      setUsers((prevUsers) => [...prevUsers, user]);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [user.room]: [],
      }));
      if (users.length === 0) setCurrentRoom(user.room);
    }
  };

  const simulateResponse = (user: User) => {
    const responseMessages = [
      `Hola, soy ${user.name}. ¿Cómo puedo ayudarte?`,
      `${user.name} está ocupado en este momento. Por favor, deja un mensaje.`,
      `¡Hola! ${user.name} aquí. ¿Qué necesitas?`,
    ];
    return responseMessages[
      Math.floor(Math.random() * responseMessages.length)
    ];
  };

  const handleSendMessage = (message: string, user: User) => {
    addMessage(currentRoom, message, user);

    setTimeout(() => {
      const simulatedMessage = simulateResponse(user);
      addMessage(currentRoom, simulatedMessage, {
        ...user,
        isCurrentUser: false,
      });
    }, 1000);
  };

  useEffect(() => {
    const fetchInitialUsers = async () => {
      const initialUsers = [];
      for (let i = 0; i < 3; i++) {
        const user = await fetchUser();
        if (user) initialUsers.push(user);
      }
      setUsers(initialUsers);
      setMessages(
        initialUsers.reduce((acc, user) => {
          acc[user.room] = [];
          return acc;
        }, {} as MessagesByRoom)
      );
      if (initialUsers.length > 0) setCurrentRoom(initialUsers[0].room);
    };

    fetchInitialUsers();
  }, []);

  useEffect(() => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => ({
        ...u,
        isCurrentUser: u.room === currentRoom,
      }))
    );
  }, [currentRoom]);

  const rooms: string[] = users.map((user) => user.room);

  const currentUser = users.find((user) => user.room === currentRoom);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar>
          <LogoHeader />
          <ChatRoomList
            users={users}
            messages={messages}
            setCurrentRoom={setCurrentRoom}
          />
          <AddUserButton onClick={addUser}>
            <FaPlus /> Create New
          </AddUserButton>
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
            messages={messages[currentRoom] || []}
            addMessage={(message) =>
              currentUser && handleSendMessage(message, currentUser)
            }
          />
        </MainContent>
      </Container>
    </>
  );
};

export default App;
