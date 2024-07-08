import React, { useState } from "react";
import {
  ChatRoomContainer,
  MessagesList,
  Message,
  MessageInputContainer,
  MessageInput,
  SendMessageButton,
  MessageContainer,
  UserAvatar,
} from './ChatRoom.styles';

interface User {
  uuid: string;
  name: string;
  avatar: string;
  room: string;
  timezone: string;
  description: string;
}

interface ChatRoomProps {
  room: string;
  messages: { user: User; message: string }[];
  addMessage: (message: string) => void;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ room, messages, addMessage }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      addMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <ChatRoomContainer>
      <MessagesList>
       {messages.map((msg, index) => (
          <MessageContainer key={index}>
            <UserAvatar src={msg.user.avatar} alt={msg.user.name} />
            <Message>{msg.message}</Message>
          </MessageContainer>
        ))}
      </MessagesList>
      <MessageInputContainer>
        <MessageInput
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendMessageButton onClick={handleSendMessage}>SEND</SendMessageButton>
      </MessageInputContainer>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
