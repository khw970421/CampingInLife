import React from "react";
import styled from "styled-components";
import Picture from "./Picture";

const Camp = ({
  containerWidth = 223,
  containerHeight = 300,
  borderRadius = 30,
  title = "제목",
  address = "주소",
  imgSrc = "logo.png",
}) => {
  return (
    <CampContainer
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      borderRadius={borderRadius}
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
`;

const PictureContainer = styled.div``;

const TAContainer = styled.div`
  margin: 0.5em;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 0.3em;
`;

const Address = styled.div`
  font-size: 0.8em;
`;

export default Camp;
