export interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  lastConnection: string;
  lastMessage: string;
}

export interface ChatRoomListProps {
  users: User[];
  messages: { [key: string]: { user: User; message: string }[] };
  setCurrentRoom: (room: string) => void;
}