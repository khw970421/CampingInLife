import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

const KakaoAPI = ({
  lati = 33.5563,
  long = 126.79581,
  width = "100%",
  height = "360px",
  text = "",
  marginH = 0,
  marginV = 0,
  paddingH = 0,
  paddingV = 0,
}) => {
  return (
    <KakaoAPIContainer
      marginH={marginH}
      marginV={marginV}
      paddingH={paddingH}
      paddingV={paddingV}
    >
      <Map center={{ lat: lati, lng: long }} style={{ width, height }}>
        <MapMarker position={{ lat: lati, lng: long }}>
          {text.length !== 0 && <div style={{ color: "#000" }}>{text}</div>}
        </MapMarker>
      </Map>
    </KakaoAPIContainer>
  );
};

const KakaoAPIContainer = styled.div`
  width: 100%;
  margin: ${({ marginH, marginV }) => `${marginH}px ${marginV}px`};
  padding: ${({ paddingH, paddingV }) => `${paddingH}px ${paddingV}px`};
`;

export default KakaoAPI;
