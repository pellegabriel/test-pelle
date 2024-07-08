import React from "react";
import { RoomButton, RoomList, UserAvatar } from "./ChatRoomList.styles";

interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  lastConnection: string;
  lastMessage: string;
}

interface ChatRoomListProps {
  rooms: string[];
  users: User[];
  messages: { [key: string]: { user: User; message: string }[] };
  setCurrentRoom: (room: string) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  rooms,
  users,
  messages,
  setCurrentRoom,
}) => {
  return (
    <RoomList>
      {rooms.slice(0, 3).map((room, index) => (
        <RoomButton key={index} onClick={() => setCurrentRoom(room)}>
          {room}
        </RoomButton>
      ))}
      {users.map((user) => {
        const lastMessageObj = messages[user.room]?.slice(-1)[0];
        const lastMessage = lastMessageObj
          ? lastMessageObj.message
          : "No messages yet";
        const lastConnectionTime = new Date(
          user.lastConnection
        ).toLocaleTimeString();
        return (
          <RoomButton key={user.uuid} onClick={() => setCurrentRoom(user.room)}>
            <UserAvatar src={user.avatar} alt={user.name} />
            <div>
              <div>{user.name}</div>
              <div>{lastConnectionTime}</div>
              <div> {lastMessage}</div>
            </div>
          </RoomButton>
        );
      })}
    </RoomList>
  );
};

export default ChatRoomList;
