import { fetchUser, simulateResponse, User } from "../api/users";

export interface MessagesByRoom {
  [key: string]: { user: User; message: string }[];
}


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
