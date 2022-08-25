import { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import styled from "styled-components";

const Intro = ({ introText = "안녕하세요" }) => {
  const [arrow, setArrow] = useState("Down");
  const clickUpDown = () => {
    setArrow(arrow === "Down" ? "Up" : "Down");
  };

  return (
    <div>
      {arrow === "Up" ? (
        <>
          <BiUpArrow onClick={clickUpDown} />
          <span onClick={clickUpDown}>Intro</span>
        </>
      ) : (
        <>
          <BiDownArrow onClick={clickUpDown} />
          <span onClick={clickUpDown}>Intro</span>
          <IntroText id="backgroundWhite">{introText}</IntroText>
        </>
      )}
    </div>
  );
};

const IntroText = styled.div`
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
`;

export default Intro;
