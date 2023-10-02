import React, { useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import Input from "@/components/Semantic/Header/Input";
import { useRouter } from "next/router";
import Image from "next/image";
import { SearchCamping } from "@/core/utils/types.d";
import { ImSearch } from "react-icons/im";

interface HeaderProps {
  isPossibleSearch?: boolean;
  searchCamping: SearchCamping[];
  isSearching: boolean;
  changeInputValue: (event: React.ChangeEvent) => void;
  checkSearchPressEnter: (
    event: React.MouseEvent,
    idx: number,
    facltNm: string | null,
    contentId: string | null
  ) => void;
  handleClearSearchData: () => void;
}

export default function Header({
  isPossibleSearch = true,
  searchCamping,
  changeInputValue,
  checkSearchPressEnter,
  handleClearSearchData,
  isSearching,
}: HeaderProps) {
  const router = useRouter();
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false)
  const handleOpenMenu = () => {
    //TODO: 메뉴 
    alert('아직 존재하지 않는 기능입니다.')
  }

  const handleOpenSearchBar = () => {
    setIsOpenSearchBar(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseSearchBar = () => {
    setIsOpenSearchBar(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <HeaderContainer>
      <ImgContainer onClick={() => router.push("/")}>
        <Image src="/mainlogo.png" alt="main image" width={200} height={100} ></Image>
      </ImgContainer>

      {isOpenSearchBar && (
        <Input
          searchCamping={searchCamping}
          isSearching={isSearching}
          changeInputValue={changeInputValue}
          checkSearchPressEnter={checkSearchPressEnter}
          handleClearSearchData={handleClearSearchData}
          closeSearchBar={handleCloseSearchBar}
        ></Input>
      )}
      <Menu>
        {isPossibleSearch && <ImSearchContainer onClick={handleOpenSearchBar}>
          <ImSearch size="40" />
        </ImSearchContainer>}
        <HamburgerContainer onClick={handleOpenMenu}>
          <GiHamburgerMenu size="50" />
        </HamburgerContainer>
      </Menu>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:relative;
`;

const ImgContainer = styled.div`
  width: 10vw;
  min-width: 200px;
  margin: 20px;
  cursor: pointer;
  height:100px;
  overflow: hidden;
`;

const Menu = styled.div`
  display:flex;
  align-items:center;
  gap:1rem;

  & > *{
    cursor:pointer
  }
`

const ImSearchContainer = styled.div`
`;

const HamburgerContainer = styled.div`
`;
