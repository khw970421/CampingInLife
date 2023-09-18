import React from "react";
import styled from "styled-components";

interface BtnStyled {
  width: number;
  height: number;
  borderRadius?: number;
  fSize?: number;
  marginH?: number;
  marginV?: number;
  paddingH?: number;
  paddingV?: number;
}
interface BtnProps extends BtnStyled {
  id: string;
  clickBtn: () => void;
  btnText: string
}

export default function Button({
  id,
  clickBtn,
  btnText,
  width,
  height,
  borderRadius = 20,
  fSize = 1,
  marginH = 0,
  marginV = 0,
  paddingH = 0,
  paddingV = 0,
}: BtnProps) {
  return (
    <Btn
      id={id}
      onClick={clickBtn}
      width={width}
      height={height}
      borderRadius={borderRadius}
      fSize={fSize}
      marginH={marginH}
      marginV={marginV}
      paddingH={paddingH}
      paddingV={paddingV}
    >
      {btnText}
    </Btn>
  );
}

const Btn = styled.button<BtnStyled>`
  width: ${({ width }) => `${width}vw`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  font-size: ${({ fSize }) => `${fSize}em`};
  margin: ${({ marginH, marginV }) => `${marginH}px ${marginV}px`};
  padding: ${({ paddingH, paddingV }) => `${paddingH}px ${paddingV}px`};
`;
