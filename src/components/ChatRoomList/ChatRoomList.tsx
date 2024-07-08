import React from 'react';
import { RoomButton, RoomList, UserAvatar } from './ChatRoomList.styles';

interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
}

interface ChatRoomListProps {
  rooms: string[];
  users: User[];
  setCurrentRoom: (room: string) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ rooms, users, setCurrentRoom }) => {
  return (
    <RoomList>
      {rooms.slice(0, 3).map((room, index) => (
        <RoomButton key={index} onClick={() => setCurrentRoom(room)}>
          {room}
        </RoomButton>
      ))}
      {users.map(user => (
        <RoomButton key={user.uuid} onClick={() => setCurrentRoom(user.room)}>
          <UserAvatar src={user.avatar} alt={user.name} />
          {user.name}
        </RoomButton>
      ))}
    </RoomList>
  );
};

export default ChatRoomList;
