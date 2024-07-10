export interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  timezone: string;
  description: string;
  isCurrentUser: boolean;
}

export interface ChatRoomProps {
  room: string;
  messages: { user: User; message: string }[];
  addMessage: (message: string) => void;
}