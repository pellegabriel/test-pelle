import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatRoomProps {
  room: string;
  messages: string[];
  addMessage: (room: string, message: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, messages, addMessage }) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue('');
  }, [room]);

  const handleAddMessage = (message: string) => {
    addMessage(room, message);
  };

  return (
    <div className="chat-room">
      <h2>{room}</h2>
      <MessageList messages={messages} />
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        addMessage={handleAddMessage}
      />
    </div>
  );
};

export default ChatRoom;
