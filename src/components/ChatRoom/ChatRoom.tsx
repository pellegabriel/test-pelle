import React, { useState } from "react";
import {
  ChatRoomContainer,
  MessagesList,
  Message,
  MessageInputContainer,
  MessageInput,
  SendMessageButton,
} from './ChatRoom.styles';

interface ChatRoomProps {
  room: string;
  messages: string[];
  addMessage: (room: string, message: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, messages, addMessage }) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      addMessage(room, newMessage);
      setNewMessage("");
    }
  };

  return (
    <ChatRoomContainer>
      <MessagesList>
        {messages.map((message, index) => (
          <Message key={index}>{message}</Message>
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
