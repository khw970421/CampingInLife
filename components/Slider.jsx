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
      <Left onClick={clickLeft} width={width}>
        <BsFillArrowLeftCircleFill className="ArrowIcon" />
      </Left>
      <Right onClick={clickRight} width={width}>
        <BsFillArrowRightCircleFill className="ArrowIcon" />
      </Right>
      {imgs.map((img, idx) => {
        return <Img key={idx} src={img} width={width} sliderNo={sliderNo} />;
      })}
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;

  @media (max-width: 900px) {
    width: 80vw;
    .ArrowIcon {
      font-size: ${({ width }) => `${width / 5}vw`};
    }
    max-height: 300px;
  }

  @media (min-width: 900px) {
    width: ${({ width }) => `${width}vw`};
    .ArrowIcon {
      font-size: ${({ width }) => `${width / 10}vw`};
    }
    max-height: 400px;
  }
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  transition-duration: 1s;
  object-fit: contain;

  @media (max-width: 900px) {
    width: 80vw;
    transform: ${({ width, sliderNo }) =>
      `translate(calc(80vw * -${sliderNo}), 0px);`};
  }

  @media (min-width: 900px) {
    width: ${({ width }) => `${width}vw`};
    transform: ${({ width, sliderNo }) =>
      `translate(calc(${width}vw * -${sliderNo}), 0px);`};
  }
`;

const Left = styled.div`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(15px, -50%);
  z-index: 1000;
`;

const Right = styled.div`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(-15px, -50%);
  z-index: 1000;
`;

export default Slider;
