import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface KakaoAPIContainerStyled {
  marginH: number;
  marginV: number;
  paddingH: number;
  paddingV: number;
}

interface KakaoAPIProps extends KakaoAPIContainerStyled {
  lati: number;
  long: number;
  width: string;
  height: string;
  text: string;
}

export default function KakaoAPI({
  lati = 33.5563,
  long = 126.79581,
  width = "100%",
  height = "360px",
  text = "",
  marginH = 0,
  marginV = 0,
  paddingH = 0,
  paddingV = 0,
}: KakaoAPIProps) {
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
}

const KakaoAPIContainer = styled.div<KakaoAPIContainerStyled>`
  width: 100%;
  margin: ${({ marginH, marginV }) => `${marginH}px ${marginV}px`};
  padding: ${({ paddingH, paddingV }) => `${paddingH}px ${paddingV}px`};
`;
