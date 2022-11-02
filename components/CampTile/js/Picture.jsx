import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Picture = ({
  imgSrc,
  topBorderRadius = 0,
  bottomBorderRadius = 0,
  containerWidth = 0,
  containerHeight = 0,
}) => {
  return (
    <ImageWrap
      topBorderRadius={topBorderRadius}
      bottomBorderRadius={bottomBorderRadius}
    >
      <Image
        src={imgSrc}
        alt="Picture of me"
        width={containerWidth}
        height={containerWidth}
        style={{ overflow: "hidden" }}
      />
    </ImageWrap>
  );
};

const ImageWrap = styled.div`
  border-radius: ${({ topBorderRadius, bottomBorderRadius }) =>
    `${topBorderRadius}px ${topBorderRadius}px ${bottomBorderRadius}px ${bottomBorderRadius}px`};
  overflow: hidden;
`;

const Img = styled.img`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerWidth }) => `${containerWidth}px`};
  border-radius: ${({ topBorderRadius, bottomBorderRadius }) =>
    `${topBorderRadius}px ${topBorderRadius}px ${bottomBorderRadius}px ${bottomBorderRadius}px`};
  object-fit: cover;
`;

export default Picture;
