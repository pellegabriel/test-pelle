import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  flex: 1;
  border-radius: 5px;
`;

export const MessagesList = styled.div`
  flex: 1;
  width: 100%;
  height: 90%;
  background-color: #e9e9e9;
`;

export const Message = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

export const MessageInputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #f3f3f3;
  border-radius: 15px;
  background-color: #fbfbfb;
`;

export const SendMessageButton = styled.button`
  padding: 10px 30px;
  border: none;
  background-color: #f0f0f0;
  color: #7f7f7f;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #e9e9e9;
  }
`;
