import React, { useState, useEffect, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/Bs";
import styled from "styled-components";

const Slider = ({
  imgs = ["logo.png", "mainlogo.png", "logo.png", "mainlogo.png", "logo.png"],
  width = 200,
  height = 100,
}) => {
  const [sliderNo, setSliderNo] = useState(0);
  // Todos : setInterval로 처리 가능한 방법 이해
  // Todos : imgs가 받은게 없을 경우 1로 처리하며 1에는 사진이 없는 이미지형태 처리 필요
  const imgsLength = useRef(imgs.length !== 0 ? imgs.length : 1);
  const clickSlide = () => {
    setSliderNo(sliderNo + 1);
  };

  const clickLeft = () =>
    setSliderNo((sliderNo - 1 + imgsLength.current) % imgsLength.current);
  const clickRight = () => setSliderNo((sliderNo + 1) % imgsLength.current);

  return (
    <SliderContainer width={width}>
      <Left height={height} onClick={clickLeft}>
        <BsFillArrowLeftCircleFill />
      </Left>
      <Right height={height} onClick={clickRight}>
        <BsFillArrowRightCircleFill />
      </Right>
      {imgs.map((img, idx) => {
        return (
          <ImgContainer width={width} height={height} key={idx}>
            <Img
              src={img}
              width={width}
              height={height}
              sliderNo={sliderNo}
              onClick={clickSlide}
            />
          </ImgContainer>
        );
      })}
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  width: ${({ width }) => `${width}px`};
  overflow: hidden;
  position: relative;
`;

const ImgContainer = styled.div`
  width: ${({ width }) => `${width}px`};
  height: auto;
`;

const Img = styled.img`
  width: ${({ width }) => `${width}px`};
  /* width: 100%; */
  height: ${({ height }) => `${height}px`};
  object-fit: contain;
  transform: ${({ width, sliderNo }) =>
    `translate(calc(${width}px * -${sliderNo}), 0px);`};
  transition-duration: 1s;
`;

const Left = styled.div`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1000;
`;

const Right = styled.div`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1000;
`;

export default Slider;
