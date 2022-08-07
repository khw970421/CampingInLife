import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Camp from "./Camp";
import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
  getImageList,
} from "../core/api/axios";

const CampContainer = ({
  containerWidth = 223,
  containerHeight = 300,
  campData = [],
}) => {
  return (
    <Container containerWidth={containerWidth}>
      {campData.map(({ facltNm, addr1, firstImageUrl, contentId }) => (
        <Camp
          key={contentId}
          className="camp"
          title={facltNm}
          address={addr1}
          imgSrc={firstImageUrl}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        ></Camp>
      ))}
    </Container>
  );
};

// 상위 태그의 크기에 영향을 받는다.
const Container = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ containerWidth }) => `${containerWidth}px`}, 1fr)
  );
  grid-gap: 20px;
`;

export default CampContainer;
