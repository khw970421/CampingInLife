import React, { useState, useEffect, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/Bs";
import styled from "styled-components";

const Slider = ({ imgs = [], width = 10 }) => {
  const [sliderNo, setSliderNo] = useState(0);
  const [imgsLength, setImgsLength] = useState(1);

  // Todos : setInterval로 처리 가능한 방법 이해
  // Todos : imgs가 받은게 없을 경우 1로 처리하며 1에는 사진이 없는 이미지형태 처리 필요
  useEffect(() => {
    setImgsLength(imgs.length);
  }, [imgs]);

  const clickLeft = () => setSliderNo((sliderNo - 1 + imgsLength) % imgsLength);
  const clickRight = () => setSliderNo((sliderNo + 1) % imgsLength);

  return (
    <SliderContainer width={width}>
      <Left onClick={clickLeft}>
        <BsFillArrowLeftCircleFill size={`${width / 10}vw`} />
      </Left>
      <Right onClick={clickRight}>
        <BsFillArrowRightCircleFill size={`${width / 10}vw`} />
      </Right>
      {imgs.map((img, idx) => {
        return (
          <ImgContainer width={width} key={idx}>
            <Img src={img} width={width} sliderNo={sliderNo} />
          </ImgContainer>
        );
      })}
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  width: ${({ width }) => `${width}vw`};
  overflow: hidden;
  position: relative;
`;

const ImgContainer = styled.div`
  width: ${({ width }) => `${width}vw`};
  height: auto;
`;

const Img = styled.img`
  width: ${({ width }) => `${width}vw`};
  object-fit: contain;
  transform: ${({ width, sliderNo }) =>
    `translate(calc(${width}vw * -${sliderNo}), 0px);`};
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
