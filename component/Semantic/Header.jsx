import React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Input from "../Input";

const Header = ({
  isInputExist = false,
  searchArr = [],
  changeInputValue,
  checkSearchPressEnter,
  clearSearchArr,
  isSearching,
}) => {
  return (
    <HeaderContainer>
      <ImgContainer>
        <Img src="/mainlogo.png"></Img>
      </ImgContainer>
      {isInputExist && (
        <Input
          searchArr={searchArr}
          changeInputValue={changeInputValue}
          checkSearchPressEnter={checkSearchPressEnter}
          clearSearchArr={clearSearchArr}
          isSearching={isSearching}
        ></Input>
      )}
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
