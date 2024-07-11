import { useState, useCallback, useEffect } from "react";
import { fetchUser, simulateResponse, User } from "../api/users";

export interface MessagesByRoom {
  [key: string]: { user: User; message: string; timestamp: string }[];
}

export const useChatSystem = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<MessagesByRoom>({});
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const addMessage = useCallback(
    (room: string, message: string, user: User) => {
      const timestamp = new Date().toLocaleTimeString([], {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prevMessages) => ({
        ...prevMessages,
        [room]: [...(prevMessages[room] || []), { user, message, timestamp }],
      }));
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.uuid === user.uuid ? { ...u, lastMessage: message } : u
        )
      );
    },
    []
  );

  const addUser = useCallback(async () => {
    const user = await fetchUser();
    if (user) {
      setUsers((prevUsers) => [...prevUsers, user]);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [user.room]: [],
      }));
      if (users.length === 0) setCurrentRoom(user.room);
    }
  }, [users.length]);

  const handleSendMessage = useCallback(
    (message: string, user: User, room: string) => {
      addMessage(room, message, user);

      setTimeout(() => {
        const simulatedMessage = simulateResponse(user);
        addMessage(room, simulatedMessage, { ...user, isCurrentUser: false });
      }, 1000);
    },
    [addMessage]
  );

  const initializeUsers = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    const newUsers = users.map((u) => ({
      ...u,
      isCurrentUser: u.room === currentRoom,
    }));
    setUsers(newUsers);
  }, [currentRoom]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const setRoomAndCloseSidebar = (room: string) => {
    setCurrentRoom(room);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return {
    users,
    messages,
    currentRoom,
    setCurrentRoom: setRoomAndCloseSidebar,
    addMessage,
    addUser,
    handleSendMessage,
    initializeUsers,
    isSidebarOpen,
    toggleSidebar,
  };
};
