import styled, { css } from 'styled-components';

export const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessagesList = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #e9e9e9;
`;

export const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  ${({ isUser }) =>
    isUser
      ? css`
          flex-direction: row-reverse;
        `
      : css`
          flex-direction: row;
        `}
`;

export const UserAvatar = styled.img<{ isUser: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: ${({ isUser }) => (isUser ? '0 0 0 10px' : '0 10px 0 0')};
`;

export const Message = styled.div<{ isUser: boolean }>`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 5px 5px 5px;
  position: relative;
  background-color: ${({ isUser }) => (isUser ? '#fceded' : '#ffffff')};
  color: #333;
  margin-top: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Agregar sombra */

  ${({ isUser }) =>
    isUser
      ? css`
          margin-right: 10px;
          &::before {
            content: "";
            position: absolute;
            top: 0px;
            right: -9px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 1px 0 10px 10px;
            border-color: transparent transparent transparent #fceded;
          }
        `
      : css`
          margin-left: 10px;
          &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: -10px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 1px 10px 10px 0;
            border-color: transparent #ffffff transparent transparent;
          }
        `}
`;

export const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin-right: 10px;
  outline: none;
  background-color: #fbfbfb;
`;

export const SendMessageButton = styled.button`
  padding: 10px 25px;
  border: none;
  background-color: #f0f0f0;
  color: #868686;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #cacaca;
  }
`;
