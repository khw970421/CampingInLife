import React, { useState, useEffect } from "react";
import { DummyData } from "./DummyData";
import Camp from "./Camp";
import styled from "styled-components";

const CampContainer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(DummyData.response.body.items.item);
  }, []);
  return (
    <Container>
      {data.map(({ facltNm, addr1, firstImageUrl }) => (
        <Camp
          className="camp"
          title={facltNm}
          address={addr1}
          imgSrc={firstImageUrl}
        ></Camp>
      ))}
    </Container>
  );
};

// 상위 태그의 크기에 영향을 받는다.
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export default CampContainer;
