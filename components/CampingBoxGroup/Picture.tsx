import React from "react";
import styled from "styled-components";
import Image, { StaticImageData } from "next/image";

interface ImageWrapStyled {
  topBorderRadius: number;
  bottomBorderRadius?: number;
}

interface PictureProps extends ImageWrapStyled {
  imgSrc: string | StaticImageData;
  size: number;
}

export default function Picture({
  imgSrc,
  topBorderRadius = 0,
  bottomBorderRadius = 0,
  size = 0,
}: PictureProps) {
  return (
    <ImageWrap
      topBorderRadius={topBorderRadius}
      bottomBorderRadius={bottomBorderRadius}
    >
      <Image
        src={imgSrc}
        alt="Picture of me"
        width={size}
        height={size}
        style={{ overflow: "hidden" }}
        objectFit="cover"
      />
    </ImageWrap>
  );
}

const ImageWrap = styled.div<ImageWrapStyled>`
  border-radius: ${({ topBorderRadius, bottomBorderRadius }) =>
    `${topBorderRadius}px ${topBorderRadius}px ${bottomBorderRadius}px ${bottomBorderRadius}px`};
  overflow: hidden;
`;
