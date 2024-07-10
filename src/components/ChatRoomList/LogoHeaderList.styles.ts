import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 8%;
  padding: 10px;
background: rgb(162,3,3);
background: linear-gradient(90deg, rgba(162,3,3,1) 0%, rgba(250,0,0,1) 100%);
  box-shadow: 0px 4px 2px -2px gray;
`;

export const LogoImage = styled.img`
  height: 55px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const LogoText = styled.h1`
  font-size: 24px;
  color: white;
`;
