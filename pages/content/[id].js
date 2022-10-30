import { useState, useEffect } from "react";
import {
  getServerSideImageList,
  getServerSideSearchList,
} from "@/core/api/axios";
import styled from "styled-components";

import { Header, Footer, Slider, Intro, KakaoAPI } from "@/components/index.js";

const Content = ({
  content: serverSierContent,
  imageLists: serverSideImageLists,
}) => {
  const [content, setContent] = useState([]);
  const [imageLists, setImageLists] = useState([]);

  useEffect(() => {
    setContent(serverSierContent);
    setImageLists(serverSideImageLists);
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

// 여기 데이터로 먼저 API 호출 진행
export async function getServerSideProps({ query }) {
  let content, imageLists;
  async function searchList(pageNo = 1, keyword) {
    const data = await getServerSideSearchList(pageNo, keyword);
    content = data[0];
  }

  async function imageList(pageNo = 1, contentId) {
    const data = await getServerSideImageList(pageNo, contentId);
    imageLists = data;
  }
  await searchList(1, query.keyword);
  await imageList(1, query.id);

  return { props: { content, imageLists } };
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
