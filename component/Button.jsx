import React from "react";
import styled from "styled-components";

const Button = ({
  id,
  btnText,
  width,
  height,
  borderRadius = 20,
  fSize = 1,
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
      onClick={clickBtn}
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
`;

export default Button;
