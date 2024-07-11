import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
`;

export const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 35%;
  background-color: #191a1e;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0);

  @media (max-width: 768px) {
    width: 300px;
    padding: 0px;
    overflow-y: auto;
    position: absolute;
    z-index: 1000;
    height: 100%;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  @media (max-width: 768px) {
    padding: 0px;
    width: 100%;
  }
`;

export const AddUserButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: #191a1e;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  &:hover {
    background-color: #3c3d3f;
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

export const MenuButton = styled.button`
  display: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
    background-color: transparent;
    padding: 10px 0px;
  }
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    padding: 10px 45px;
  }
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

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDescription = styled.div`
  font-size: 14px;
  color: gray;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;
