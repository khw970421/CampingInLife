import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface ImageWrapStyled {
  topBorderRadius: number;
  bottomBorderRadius?: number;
}

interface PictureProps extends ImageWrapStyled {
  imgSrc: string;
  containerWidth: number;
  containerHeight: number;
}

export default function Picture({
  imgSrc,
  topBorderRadius = 0,
  bottomBorderRadius = 0,
  containerWidth = 0,
  containerHeight = 0,
}: PictureProps) {
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
}

const ImageWrap = styled.div<ImageWrapStyled>`
  border-radius: ${({ topBorderRadius, bottomBorderRadius }) =>
    `${topBorderRadius}px ${topBorderRadius}px ${bottomBorderRadius}px ${bottomBorderRadius}px`};
  overflow: hidden;
`;
