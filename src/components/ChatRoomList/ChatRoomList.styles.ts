import styled from 'styled-components';

export const RoomList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RoomButton = styled.button`
  padding: 10px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #191a1e;
  border: none;
  width: 100%;
  text-align: left;
  border-bottom: 2px solid gray;

  &:hover {
    background-color: #3c3d3f;
  }
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const UserNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const UserName = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const UserLastConnection = styled.span`
  font-size: 0.8em;
  color: #a1a1a1;
`;

export const LastMessage = styled.div`
  color: #a1a1a1;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
