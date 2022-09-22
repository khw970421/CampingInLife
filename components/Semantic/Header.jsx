import React from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import Input from "@/components/Input";
import { useRouter } from "next/router";

const Header = ({
  searchArr = [],
  isSearching,
  changeInputValue,
  checkSearchPressEnter,
  clearSearchArr,
}) => {
  const router = useRouter();
  return (
    <HeaderContainer>
      <ImgContainer onClick={() => router.push("/")}>
        <Img src="/mainlogo.png"></Img>
      </ImgContainer>
      <Input
        searchArr={searchArr}
        changeInputValue={changeInputValue}
        checkSearchPressEnter={checkSearchPressEnter}
        clearSearchArr={clearSearchArr}
        isSearching={isSearching}
      ></Input>
      <HamburgerContainer>
        <GiHamburgerMenu size="50" />
      </HamburgerContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 10vw;
  min-width: 100px;
  margin: 20px;
  cursor: pointer;
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
export default Header;
