import { useState, useEffect } from "react";
import {
  getServerSideSearchList,
  getServerSideImageList,
} from "@/core/api/axios";
import styled from "styled-components";

import { Header, Footer, Slider, Intro, KakaoAPI } from "@/components/index.js";
import { useRouter } from "next/router";

const Content = ({ serverImage, serverContent }) => {
  const [content, setContent] = useState([]);
  const [imageLists, setImageLists] = useState([]);
  useEffect(() => {
    setContent(serverContent);
    setImageLists(serverImage);
  }, []);
  return (
    <>
      <Header />
      <Body id="backgroundLightGray">
        <Main>
          <Title id="titleText">🏕️ {content?.facltNm}</Title>
          {imageLists.length !== 0 && <Slider imgs={imageLists} width={40} />}
          <IntroContainer>
            <Intro introText={content?.intro} />
          </IntroContainer>
          <Location>
            <div id="titleText">위치</div>
            <div id="subText">{content?.addr1}</div>
          </Location>
          <KakaoAPI long={content?.mapX} lati={content?.mapY} marginH={10} />
        </Main>
      </Body>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id, keyword } = context.query;
  const image = await getServerSideImageList(1, id);
  const content = await getServerSideSearchList(1, keyword);
  return {
    props: { serverContent: content[0], serverImage: image },
  };
}

const Body = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;

  @media (max-width: 900px) {
    min-width: 300px;
    margin: 0vw 5vw;
  }

  @media (min-width: 900px) {
    width: calc(100vw - 22vw * 2);
    margin: 0vw 22vw;
  }
`;

const Title = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const IntroContainer = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const Location = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

export default Content;
