import { MessageListProps } from "./types";

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
