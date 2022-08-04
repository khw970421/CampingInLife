import React from "react";
import styled from "styled-components";
import Picture from "./Picture";

const Camp = ({
  containerWidth = 223,
  containerHeight = 300,
  title = "당진해양캠핑공원",
  address = "충청남도 당진시 신평면 산정길 112",
  imgSrc = "",
  borderRadius = 30,
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
          borderRadius={borderRadius}
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
  font-size: 1.2em;
  margin-bottom: 0.3em;
`;

const Address = styled.div`
  font-size: 0.8em;
`;

export default Camp;
