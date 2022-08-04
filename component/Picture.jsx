import React from "react";
import styled from "styled-components";

// example1.jpg의 경우 public 폴더에 기본사진으로 처리

const Picture = ({
  imgSrc = "example1.jpg",
  width = 446,
  height = 446,
  borderRadius = 0,
}) => {
  return (
    <ImgContainer width={width} height={height}>
      <Img src={imgSrc} borderRadius={borderRadius}></Img>
    </ImgContainer>
  );
};

const ImgContainer = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;

export default Picture;
