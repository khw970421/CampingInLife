import { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import styled from "styled-components";

const noIntroMessage = "Intro 내용이 존재하지 않습니다.";

const Intro = ({ introText }) => {
  const [isArrowDown, setIsArrowDown] = useState(true);
  const clickIntro = () => {
    setIsArrowDown(!isArrowDown);
  };

  return (
    <IntroContainer>
      {isArrowUp ? (
        <>
          <BiUpArrow onClick={clickUpDown} />
          <IntroSpan onClick={clickUpDown}>Intro</IntroSpan>
        </>
      ) : (
        <BiUpArrow onClick={clickIntro} />
      )}
      <IntroSpan onClick={clickIntro} id="titleText">
        Intro
      </IntroSpan>
      {isArrowDown && (
        <IntroText id="backgroundWhite" isArrowDown={isArrowDown}>
          {introText ? introText : noIntroMessage}
        </IntroText>
      )}
    </IntroContainer>
  );
};

const IntroContainer = styled.div`
  margin: 10px 0px;
`;

const IntroText = styled.div`
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  margin: 5px 0px;
`;

const IntroSpan = styled.span`
  margin: 3px;
`;

export default Intro;
