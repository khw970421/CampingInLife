import React from "react";
import styled from "styled-components";
import Picture from "./Picture";
import { useRouter } from "next/router";

const Camp = ({
  containerWidth = 223,
  containerHeight = 300,
  borderRadius = 30,
  title = "제목",
  address = "주소",
  imgSrc = "logo.png",
  contentId,
}) => {
  const router = useRouter();
  const clickCamp = () => {
    router.push(`/content/${contentId}?keyword=${title}`);
  };
  return (
    <CampContainer
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      borderRadius={borderRadius}
      onClick={clickCamp}
    >
      <PictureContainer>
        <Picture
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          topBorderRadius={borderRadius}
          imgSrc={imgSrc !== "" ? imgSrc : "logo.png"}
        ></Picture>
      </PictureContainer>
      <TAContainer>
        <Title>{title}</Title>
        <Address>{address}</Address>
      </TAContainer>
    </CampContainer>
  );
};

const CampContainer = styled.div`
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
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
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

export default Camp;
