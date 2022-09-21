import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getSearchList, getImageList } from "@/core/api/axios";
import styled from "styled-components";
import Slider from "@/components/Slider";
import Intro from "@/components/Intro";
import KakaoAPI from "@/components/KakaoAPI";
import Footer from "@/components/Semantic/Footer";
import Header from "@/components/Semantic/Header";

const Content = () => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [imageLists, setImageLists] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    searchList(1, router.query.keyword);
    imageList(1, router.query.id);
  }, [router.isReady]);

  async function searchList(pageNo = 1, keyword) {
    const data = await getSearchList(pageNo, keyword);
    setContent(data[0]);
  }

  async function imageList(pageNo = 1, contentId) {
    const data = await getImageList(pageNo, contentId);
    setImageLists(data);
  }

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
