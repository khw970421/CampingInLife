import React from "react";
import styled from "styled-components";

const Picture = ({
  imgSrc = "logo.png",
  topBorderRadius = 0,
  bottomBorderRadius = 0,
  containerWidth = 0,
  containerHeight = 0,
}) => {
  return (
    <Img
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      topBorderRadius={topBorderRadius}
      bottomBorderRadius={bottomBorderRadius}
      src={imgSrc}
    ></Img>
  );
};

const Img = styled.img`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerWidth }) => `${containerWidth}px`};
  border-radius: ${({ topBorderRadius, bottomBorderRadius }) =>
    `${topBorderRadius}px ${topBorderRadius}px ${bottomBorderRadius}px ${bottomBorderRadius}px`};
  object-fit: cover;
`;

export default Picture;
