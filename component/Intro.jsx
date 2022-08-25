import { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import styled from "styled-components";

const Intro = ({ introText = "안녕하세요" }) => {
  const [isArrowUp, setIsArrowUp] = useState(true);
  const clickUpDown = () => {
    setIsArrowUp(!isArrowUp);
  };

  return (
    <IntroContainer>
      {isArrowUp ? (
        <>
          <BiUpArrow onClick={clickUpDown} />
          <IntroSpan onClick={clickUpDown}>Intro</IntroSpan>
        </>
      ) : (
        <>
          <BiDownArrow onClick={clickUpDown} />
          <IntroSpan onClick={clickUpDown}>Intro</IntroSpan>
          <IntroText id="backgroundWhite">{introText}</IntroText>
        </>
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
