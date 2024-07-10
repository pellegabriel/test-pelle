// src/utils.ts

import axios from "axios";

export interface User {
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

export interface MessagesByRoom {
  [key: string]: { user: User; message: string }[];
}

export const fetchUser = async (): Promise<User | null> => {
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

export const simulateResponse = (user: User): string => {
  const responseMessages = [
    `Hola, soy ${user.name}. ¿Cómo puedo ayudarte?`,
    `${user.name} está ocupado en este momento. Por favor, deja un mensaje.`,
    `¡Hola! ${user.name} aquí. ¿Qué necesitas?`,
  ];
  return responseMessages[
    Math.floor(Math.random() * responseMessages.length)
  ];
};

export const addMessage = (
  room: string,
  message: string,
  user: User,
  messages: MessagesByRoom,
  setMessages: React.Dispatch<React.SetStateAction<MessagesByRoom>>,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
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

export const addUser = async (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setMessages: React.Dispatch<React.SetStateAction<MessagesByRoom>>,
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>
) => {
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

export const handleSendMessage = (
  message: string,
  user: User,
  currentRoom: string,
  addMessage: (
    room: string,
    message: string,
    user: User,
    messages: MessagesByRoom,
    setMessages: React.Dispatch<React.SetStateAction<MessagesByRoom>>,
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
  ) => void,
  messages: MessagesByRoom,
  setMessages: React.Dispatch<React.SetStateAction<MessagesByRoom>>,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  addMessage(currentRoom, message, user, messages, setMessages, setUsers);

  setTimeout(() => {
    const simulatedMessage = simulateResponse(user);
    addMessage(
      currentRoom,
      simulatedMessage,
      { ...user, isCurrentUser: false },
      messages,
      setMessages,
      setUsers
    );
  }, 1000);
};
