import React, { useState, useEffect } from "react";
import { DummyData } from "./DummyData";
import Camp from "./Camp";

const CampContainer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(DummyData.response.body.items.item);
  }, []);
  console.log(data);
  return (
    <div>
      {data.map(({ facltNm, addr1, firstImageUrl }) => (
        <Camp title={facltNm} address={addr1} imgSrc={firstImageUrl}></Camp>
      ))}
    </div>
  );
};

export default CampContainer;
