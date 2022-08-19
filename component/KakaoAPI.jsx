import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoAPI = ({
  lati = 33.5563,
  long = 126.79581,
  width = "100%",
  height = "360px",
  text = "",
}) => {
  return (
    <>
      <Map center={{ lat: lati, lng: long }} style={{ width, height }}>
        <MapMarker position={{ lat: lati, lng: long }}>
          {text.length !== 0 && <div style={{ color: "#000" }}>{text}</div>}
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoAPI;
