import React, { useEffect } from "react";
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
  MenuButton,
} from "./App.styles";
import { LogoHeader } from "./components/ChatRoomList/LogoHeader";
import { GlobalStyle } from "./global.styles";
import { FaPlus, FaBars } from "react-icons/fa";
import { useChatSystem } from "./hooks/useChatSystem";

const App = () => {
  const {
    users,
    addUser,
    messages,
    currentRoom,
    setCurrentRoom,
    initializeUsers,
    handleSendMessage,
    isSidebarOpen,
    toggleSidebar,
  } = useChatSystem();

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  const currentUser = users.find((user) => user.room === currentRoom);

  return (
    <>
      <GlobalStyle />
      <Container>
        <MenuButton onClick={toggleSidebar}>
          <FaBars />
        </MenuButton>
        <Sidebar isOpen={isSidebarOpen}>
          <LogoHeader />
          <ChatRoomList users={users} setCurrentRoom={setCurrentRoom} />
          <AddUserButton onClick={addUser}>
            <FaPlus size={20} />
            Create New
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
            addMessage={(message) => {
              if (currentUser) {
                handleSendMessage(message, currentUser, currentRoom);
              }
            }}
          />
        </MainContent>
      </Container>
    </>
  );
};

export default App;
