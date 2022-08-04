import React, { useState, useEffect } from "react";
import { DummyData } from "./DummyData";
import Camp from "./Camp";
import styled from "styled-components";
import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
  getImageList,
} from "../core/api/axios";

const CampContainer = ({ containerWidth = 223, containerHeight = 300 }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Todo : 상황에 따라 API 사용 예정
    async function api() {
      const data = await getLocationBasedList(1);
      setData(data);
    }
    api();
  }, []);
  return (
    <Container containerWidth={containerWidth}>
      {data.map(({ facltNm, addr1, firstImageUrl }) => (
        <Camp
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
