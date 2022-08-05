import styled from "styled-components";
import Camp from "../component/Camp";
import CampContainer from "../component/CampContainer";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Home() {
  return (
    <div>
      <Header>
        <ImgContainer>
          <Img src="mainlogo.png"></Img>
        </ImgContainer>
        <Input placeholder="어디로 갈까?"></Input>
        <HamburgerContainer>
          <GiHamburgerMenu size="50" />
        </HamburgerContainer>
      </Header>
      <Body>{/* <CampContainer /> */}</Body>
    </div>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 10vw;
  margin: 20px;
`;

const Img = styled.img`
  width: 100%;
`;

const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 10vw;
  margin: 20px;
`;

const Input = styled.input`
  border: 0.3px solid;
  border-radius: 24px;
  width: 30vw;
  height: 50px;
  margin: 20px;
  padding: 10px;
`;

const Body = styled.div`
  display: flex;
  width: calc(100vw - 22vw * 2);
  height: auto;
  margin: 22vw;
`;
