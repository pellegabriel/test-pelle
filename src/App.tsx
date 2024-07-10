import { useState, useEffect } from "react";
import { ChatRoom } from "./components/ChatRoom/ChatRoom";
import { ChatRoomList } from "./components/ChatRoomList/ChatRoomList";
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
import { LogoHeader } from "./components/ChatRoomList/LogoHeader";
import { GlobalStyle } from "./global.styles";
import { FaPlus } from "react-icons/fa";
import {
  fetchUser,
  addMessage,
  addUser,
  handleSendMessage,
  User,
  MessagesByRoom,
} from "./utils/utils";

 const App = () => {
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [messages, setMessages] = useState<MessagesByRoom>({});
  const [users, setUsers] = useState<User[]>([]);

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
          <AddUserButton
            onClick={() =>
              addUser(users, setUsers, setMessages, setCurrentRoom)
            }>
            <FaPlus size={20} /> Create New
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
              currentUser &&
              handleSendMessage(
                message,
                currentUser,
                currentRoom,
                addMessage,
                messages,
                setMessages,
                setUsers
              )
            }
          />
        </MainContent>
      </Container>
    </>
  );
};

export default App