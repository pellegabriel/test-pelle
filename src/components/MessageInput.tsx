// src/components/MessageInput.tsx
import React from 'react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  addMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, addMessage }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addMessage(value);
      onChange('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
