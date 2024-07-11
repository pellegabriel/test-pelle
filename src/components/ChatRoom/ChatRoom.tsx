import React, { useState, useCallback, memo } from "react";
import {
  Message,
  UserAvatar,
  MessagesList,
  MessageInput,
  MessageContainer,
  ChatRoomContainer,
  SendMessageButton,
  MessageInputContainer,
  MessageTimestamp,
  MessageContent,
} from "./ChatRoom.styles";
import { User } from "../../api/users";
import userImage from "../../assets/user.png";

interface ChatRoomProps {
  room: string;
  messages: { user: User; message: string; timestamp: string }[];
  addMessage: (message: string) => void;
}

export const ChatRoom = memo(({ messages, addMessage }: ChatRoomProps) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== "") {
      addMessage(newMessage);
      setNewMessage("");
    }
  }, [newMessage, addMessage]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value);
    },
    []
  );

  return (
    <ChatRoomContainer>
      <MessagesList>
        {messages.map((msg, index) => (
          <MessageContainer key={index} isUser={msg.user.isCurrentUser}>
            <UserAvatar
              alt={msg.user.name}
              isUser={msg.user.isCurrentUser}
              src={msg.user.isCurrentUser ? userImage : msg.user.avatar}
            />
            <MessageContent>
              <MessageTimestamp isUser={msg.user.isCurrentUser}>
                {msg.timestamp}
              </MessageTimestamp>
              <Message isUser={msg.user.isCurrentUser}>{msg.message}</Message>
            </MessageContent>
          </MessageContainer>
        ))}
      </MessagesList>
      <MessageInputContainer>
        <MessageInput
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={handleInputChange}
        />
        <SendMessageButton onClick={handleSendMessage}>SEND</SendMessageButton>
      </MessageInputContainer>
    </ChatRoomContainer>
  );
});
