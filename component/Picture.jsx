import React from "react";
import styled from "styled-components";

// example1.jpg의 경우 public 폴더에 기본사진으로 처리

const Picture = ({
  imgSrc = "example2.jpg",
  borderRadius = 0,
  containerWidth = 0,
  containerHeight = 0,
}) => {
  return (
    <Img
      src={imgSrc}
      borderRadius={borderRadius}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
    ></Img>
  );
};

const Img = styled.img`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerWidth }) => `${containerWidth}px`};
  object-fit: contain;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;

export default Picture;
