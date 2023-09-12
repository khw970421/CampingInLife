import React from "react";
import styled from "styled-components";

const footer_data = {
  'copyright': 'COPYRIGHT 2022 BY CampInLife ALL RIGHT RESERVED',
  'information': {
    'phone': '전화 : 010-3266-1140',
    'email': '이메일 : khw970421@kakao.com',
    'github': 'GitHub : khw970421',
  }
}

const Footer = () => {
  const { copyright, information } = footer_data
  return (
    <FooterContainer>
      <CopyRight>{copyright}</CopyRight>
      <Information>
        <h3>💻 개발자 정보</h3>
        {Object.values(information).map(data => <span key={data}>{data}</span>)}
      </Information>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0px;
`;

const CopyRight = styled.p``
const Information = styled.p`
  display:flex;
  flex-direction:column;
`

export default Footer;
