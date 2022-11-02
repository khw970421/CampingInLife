import React, { useState, useEffect, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/Bs";
import styled from "styled-components";

interface SliderContainerStyled {
  width: number;
}

interface ImgStyled extends SliderContainerStyled {
  transitionStyle: string;
  currentIndex: number;
}

interface SliderProps {
  imgs: string[];
  width: number;
}

const transitionTime = 500;
const transitionStyle = `${transitionTime}ms ease 0s`;

const Slider = ({ imgs = [], width = 10 }: SliderProps) => {
  // imgs + 양옆 2개
  const [infiniteImgs, setInfiniteImgs] = useState([]);
  // imgs의 크기
  const [imgsLength, setImgsLength] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState("");

  function replaceSlide(index) {
    setTimeout(() => {
      setTransition("");
      setCurrentIndex(index);
    }, transitionTime);
  }

  function clickLeft() {
    let index = currentIndex - 1;
    setCurrentIndex(index);
    if (index < 2) {
      index += imgsLength;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  }

  function clickRight() {
    let index = currentIndex + 1;
    setCurrentIndex(index);
    if (index >= imgsLength) {
      index -= imgsLength;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  }

  useEffect(() => {
    setImgsLength(imgs.length);
    const infinite = [];
    infinite.push(imgs[imgs.length - 1]);
    infinite.push(...imgs);
    infinite.push(imgs[0]);
    setInfiniteImgs(infinite);
  }, [imgs]);

  return (
    <SliderContainer width={width}>
      <Left onClick={clickLeft}>
        <BsFillArrowLeftCircleFill className="ArrowIcon" />
      </Left>
      <Right onClick={clickRight}>
        <BsFillArrowRightCircleFill className="ArrowIcon" />
      </Right>
      {infiniteImgs.map((img, idx) => {
        return (
          <Img
            key={idx}
            src={img}
            width={width}
            currentIndex={currentIndex}
            transitionStyle={transition}
          />
        );
      })}
    </SliderContainer>
  );
};

const Img = styled.img<ImgStyled>`
  transition: ${({ transitionStyle }) => transitionStyle};
  object-fit: contain;

  @media (max-width: 900px) {
    width: 80vw;
    transform: ${({ currentIndex }) =>
      `translate(calc(80vw * -${currentIndex}), 0px);`};
  }

  @media (min-width: 900px) {
    width: ${({ width }) => `${width}vw`};
    transform: ${({ width, currentIndex }) =>
      `translate(calc(${width}vw * -${currentIndex}), 0px);`};
  }
`;

const SliderContainer = styled.div<SliderContainerStyled>`
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
