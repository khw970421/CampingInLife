import React from "react";
import styled from "styled-components";
import CampingBox from "./CampingBox";
import logo from "@/public/logo.png";
import { CampingInfo } from "@/core/utils/types.d";

interface ContainerStyled {
  containerWidth?: number;
}

interface CampingBoxGroupProps extends ContainerStyled {
  campingInfo: CampingInfo[];
  isHoverActive: boolean;
  containerWidth?: number;
  containerHeight?: number;
}

export default function CampingBoxGroup({
  campingInfo = [],
  isHoverActive = true,
  containerWidth = 223,
  containerHeight = 300,
}: CampingBoxGroupProps) {
  const returnImageSrc = (url) => (url !== "" ? url : logo);
  return (
    <Container containerWidth={containerWidth}>
      {campingInfo.map(({ facltNm, addr1, firstImageUrl, contentId }) => (
        <CampingBox
          key={contentId}
          title={facltNm}
          address={addr1}
          imgSrc={returnImageSrc(firstImageUrl)}
          contentId={contentId}
          isHoverActive={isHoverActive}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        ></CampingBox>
      ))}
    </Container>
  );
}

// 상위 태그의 크기에 영향을 받는다.
const Container = styled.div<ContainerStyled>`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ containerWidth }) => `${containerWidth}px`}, 1fr)
  );
  grid-gap: 20px;
`;
