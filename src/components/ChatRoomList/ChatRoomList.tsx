import React from "react";
import { RoomButton, RoomList, UserAvatar, UserInfo, UserName, LastMessage, UserNameContainer, UserLastConnection } from "./ChatRoomList.styles";

interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  lastConnection: string;
  lastMessage: string;
}

interface ChatRoomListProps {
  users: User[];
  messages: { [key: string]: { user: User; message: string }[] };
  setCurrentRoom: (room: string) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ users, messages, setCurrentRoom }) => {
  return (
    <RoomList>
      {users.map(user => (
        <RoomButton key={user.uuid} onClick={() => setCurrentRoom(user.room)}>
          <UserAvatar src={user.avatar} alt={user.name} />
          <UserInfo>
            <UserNameContainer>
              <UserName>{user.name}</UserName>
              <UserLastConnection>
                {new Date(user.lastConnection).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </UserLastConnection>
            </UserNameContainer>
            <LastMessage>{user.lastMessage ? user.lastMessage.substring(0, 30) + (user.lastMessage.length > 30 ? '...' : '') : "No messages yet"}</LastMessage>
          </UserInfo>
        </RoomButton>
      ))}
    </RoomList>
  );
};

export default ChatRoomList;
