import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  max-width: 100vw;
`;

export const Sidebar = styled.div`
  width: 35%;
  background-color: #191a1e;
  display: flex;
  flex-direction: column;
`;

export const AddUserButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #191a1e;
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: #3c3d3f;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDescription = styled.div`
  font-size: 14px;
  color: gray;
`;

export const UserTimezone = styled.div`
  font-size: 12px;
  color: gray;
`;
