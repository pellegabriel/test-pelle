import React, { memo } from "react";
import {
  RoomButton,
  RoomList,
  UserAvatar,
  UserInfo,
  UserName,
  LastMessage,
  UserNameContainer,
  UserLastConnection,
} from "./ChatRoomList.styles";
import { User } from "../../api/users";

interface ChatRoomListProps {
  users: User[];
  setCurrentRoom: (room: string) => void;
}

export const ChatRoomList = memo(({ users, setCurrentRoom }: ChatRoomListProps) => {
  return (
    <RoomList>
      {users.map((user) => {
        const lastConnection = new Date(user.lastConnection).toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        })

        const lastMessage = user.lastMessage
          ? user.lastMessage.substring(0, 30) + (user.lastMessage.length > 30 ? "..." : "")
          : "No messages yet"

        return (
          <RoomButton key={user.uuid} onClick={() => setCurrentRoom(user.room)}>
            <UserAvatar src={user.avatar} alt={user.name} />
            <UserInfo>
              <UserNameContainer>
                <UserName>{user.name}</UserName>
                <UserLastConnection>
                  {lastConnection}
                </UserLastConnection>
              </UserNameContainer>
              <LastMessage>
                {lastMessage}
              </LastMessage>
            </UserInfo>
          </RoomButton>
        )
      })}
    </RoomList>
  );
});