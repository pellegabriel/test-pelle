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
import { ChatRoomListProps } from "./types";

export const ChatRoomList = ({ users, setCurrentRoom }: ChatRoomListProps) => {
  return (
    <RoomList>
      {users.map((user) => (
        <RoomButton key={user.uuid} onClick={() => setCurrentRoom(user.room)}>
          <UserAvatar src={user.avatar} alt={user.name} />
          <UserInfo>
            <UserNameContainer>
              <UserName>{user.name}</UserName>
              <UserLastConnection>
                {new Date(user.lastConnection).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </UserLastConnection>
            </UserNameContainer>
            <LastMessage>
              {user.lastMessage
                ? user.lastMessage.substring(0, 30) +
                  (user.lastMessage.length > 30 ? "..." : "")
                : "No messages yet"}
            </LastMessage>
          </UserInfo>
        </RoomButton>
      ))}
    </RoomList>
  );
};
