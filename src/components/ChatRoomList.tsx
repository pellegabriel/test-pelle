import React from 'react';
import styled from 'styled-components';

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

const RoomList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const RoomButton = styled.button`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default ChatRoomList;
