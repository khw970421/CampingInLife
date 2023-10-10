import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { StaticImageData } from "next/image";
import Picture from "./Picture";

interface CampingBoxStyled {
  isHoverActive: boolean;
  containerWidth: number;
  containerHeight: number;
  borderRadius?: number;
}

interface CampingBoxProps extends CampingBoxStyled {
  title: string;
  address: string;
  imgSrc: string | StaticImageData;
  contentId: string;
}

export default function CampingBox({
  title = "제목",
  address = "주소",
  imgSrc,
  contentId,
  isHoverActive,
  containerWidth,
  containerHeight,
  borderRadius = 30,
}: CampingBoxProps) {
  const router = useRouter();
  const clickCamp = () => {
    router.push(`/content/${contentId}?keyword=${title}`);
  };

  return (
    <CampingCard
      onClick={clickCamp}
      isHoverActive={isHoverActive}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      borderRadius={borderRadius}
    >
      <PictureContainer>
        <Picture
          imgSrc={imgSrc}
          size={containerWidth}
          topBorderRadius={borderRadius}
        ></Picture>
      </PictureContainer>
      <TAContainer>
        <Title>{title}</Title>
        <Address>{address}</Address>
      </TAContainer>
    </CampingCard>
  );
}

const CampingCard = styled.div<CampingBoxStyled>`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerHeight }) => `${containerHeight}px`};
  border: 1px solid;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  box-sizing: content-box;
  margin: 10px;
  justify-self: center;

  transition: all ease 0.2s;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  :hover {
    transform: ${({ isHoverActive }) => isHoverActive && `translateY(-5px)`};
    box-shadow: ${({ isHoverActive }) =>
    isHoverActive && ` 0px 10px 20px 2px rgba(0, 0, 0, 0.25)`};
  }
`;

const PictureContainer = styled.div``;

const TAContainer = styled.div`
  margin: 0.5em;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 0.3em;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;

const Address = styled.div`
  font-size: 0.8em;
  overflow: hidden; // 을 사용해 영역을 감출 것
  text-overflow: ellipsis; // 로 ... 을 만들기
  white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
  word-break: break-all;
`;
