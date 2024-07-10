import logo from "../../assets/psh_brand.png";
import { HeaderContainer, LogoImage, LogoText } from "./LogoHeaderList.styles";

export const LogoHeader = () => {
  return (
    <HeaderContainer>
      <LogoImage src={logo} alt="Logo" />
      <LogoText>React Chat</LogoText>
    </HeaderContainer>
  );
};
