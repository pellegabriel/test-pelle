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

  &:hover {
    background-color: #3c3d3f;
  }
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;