import React from "react";
import styled from "styled-components";

const Picture = ({
  imgSrc = "logo.png",
  borderRadius = 0,
  containerWidth = 0,
  containerHeight = 0,
}) => {
  return (
    <Img
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      borderRadius={borderRadius}
      src={imgSrc}
    ></Img>
  );
};

const Img = styled.img`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerWidth }) => `${containerWidth}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  object-fit: contain;
`;

export default Picture;
