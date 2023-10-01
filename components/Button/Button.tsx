import React from "react";
import styled from "styled-components";

interface BtnStyled {
  width: number;
  borderRadius?: number;
  fSize?: number;
  marginH?: number;
  marginV?: number;
  paddingH?: number;
  paddingV?: number;
}
interface BtnProps extends BtnStyled {
  id: string;
  className?: string;
  clickBtn: () => void;
  btnText: string
}

export default function Button({
  id,
  className,
  clickBtn,
  btnText,
  width,
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
      className={className}
      onClick={clickBtn}
      width={width}
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
  width: ${({ width }) => `${width}rem`};
  border-radius: ${({ borderRadius }) => `${borderRadius}rem`};
  font-size: ${({ fSize }) => `${fSize}em`};
  margin: ${({ marginH, marginV }) => `${marginH}rem ${marginV}rem`};
  padding: ${({ paddingH, paddingV }) => `${paddingH}rem ${paddingV}rem`};
`;
