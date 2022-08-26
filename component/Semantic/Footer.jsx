import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <div>COPYRIGHT 2022 BY CampInLife ALL RIGHT RESERVED</div>
      <div>
        <Information>💻 개발자 정보</Information>
        <Phone>📱 &nbsp;&nbsp;전화 : 010-3266-1140 </Phone>
        <div>✉️ 이메일 : khw970421@kakao.com</div>
        <div>📜 GitHub : khw970421</div>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0px;
`;

const Information = styled.div`
  font-weight: bold;
  font-size: 1em;
  padding: 10px 0px;
`;

const Phone = styled.div`
  white-space: pre;
`;

export default Footer;
