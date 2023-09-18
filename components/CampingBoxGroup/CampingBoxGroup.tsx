import React from "react";
import styled from "styled-components";
import Camp from "./CampingBox";
import logo from "@/public/logo.png";

interface CampDataObj {
  contentId: string;
  facltNm: string;
  lineIntro: string;
  intro: string;
  allar: string;
  insrncAt: string;
  trsagntNo: string;
  bizrno: string;
  facltDivNm: string;
  mangeDivNm: string;
  mgcDiv: string;
  manageSttus: string;
  hvofBgnde: string;
  hvofEnddle: string;
  featureNm: string;
  induty: string;
  lctCl: string;
  doNm: string;
  sigunguNm: string;
  zipcode: string;
  addr1: string;
  addr2: string;
  mapX: string;
  mapY: string;
  direction: string;
  tel: string;
  homepage: string;
  resveUrl: string;
  resveCl: string;
  manageNmpr: string;
  gnrlSiteCo: string;
  autoSiteCo: string;
  glampSiteCo: string;
  caravSiteCo: string;
  indvdlCaravSiteCo: string;
  sitedStnc: string;
  siteMg1Width: string;
  siteMg2Width: string;
  siteMg3Width: string;
  siteMg1Vrticl: string;
  siteMg2Vrticl: string;
  siteMg3Vrticl: string;
  siteMg1Co: string;
  siteMg2Co: string;
  siteMg3Co: string;
  siteBottomCl1: string;
  siteBottomCl2: string;
  siteBottomCl3: string;
  siteBottomCl4: string;
  siteBottomCl5: string;
  tooltip: string;
  glampInnerFclty: string;
  caravInnerFclty: string;
  prmisnDe: string;
  operPdCl: string;
  operDeCl: string;
  trlerAcmpnyAt: string;
  caravAcmpnyAt: string;
  toiletCo: string;
  swrmCo: string;
  wtrplCo: string;
  brazierCl: string;
  sbrsCl: string;
  sbrsEtc: string;
  posblFcltyCl: string;
  posblFcltyEtc: string;
  clturEventAt: string;
  clturEvent: string;
  exprnProgrmAt: string;
  exprnProgrm: string;
  extshrCo: string;
  frprvtWrppCo: string;
  frprvtSandCo: string;
  fireSensorCo: string;
  themaEnvrnCl: string;
  eqpmnLendCl: string;
  animalCmgCl: string;
  tourEraCl: string;
  firstImageUrl: string;
  createdtime: string;
  modifiedtime: string;
}

interface ContainerStyled {
  containerWidth?: number;
}

interface CampingBoxGroupProps extends ContainerStyled {
  campData: CampDataObj[];
  isHoverActive: boolean;
  containerWidth?: number;
  containerHeight?: number;
}

export default function CampingBoxGroup({
  campData = [],
  isHoverActive = true,
  containerWidth = 223,
  containerHeight = 300,
}: CampingBoxGroupProps) {
  const returnImageSrc = (url) => (url !== "" ? url : logo);
  return (
    <Container containerWidth={containerWidth}>
      {campData.map(({ facltNm, addr1, firstImageUrl, contentId }) => (
        <Camp
          key={contentId}
          title={facltNm}
          address={addr1}
          imgSrc={returnImageSrc(firstImageUrl)}
          contentId={contentId}
          isHoverActive={isHoverActive}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        ></Camp>
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
