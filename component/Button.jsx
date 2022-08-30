import React from "react";
import styled from "styled-components";

const Button = ({
  id,
  btnText,
  width,
  height,
  borderRadius = 20,
  fSize = 1,
  marginH = 0,
  marginV = 0,
  paddingH = 0,
  paddingV = 0,
  click,
}) => {
  const clickBtn = () => {
    click();
  };
  return (
    <Btn
      id={id}
      width={width}
      height={height}
      borderRadius={borderRadius}
      fSize={fSize}
    >
      {btnText}
    </Btn>
  );
};

const Btn = styled.button`
  width: ${({ width }) => `${width}vw`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  font-size: ${({ fSize }) => `${fSize}em`};
  margin: ${({ marginH, marginV }) => `${marginH}px ${marginV}px`};
  padding: ${({ paddingH, paddingV }) => `${paddingH}px ${paddingV}px`};
`;

export default Button;
