import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getImageList, getSearchList } from "../../core/api/axios";
import styled from "styled-components";
import Slider from "../../component/Slider";
import Intro from "../../component/Intro";
import KakaoAPI from "../../component/KakaoAPI";
import Footer from "../../component/Semantic/Footer";
import Header from "../../component/Semantic/Header";

const content = () => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [imageLists, setImageLists] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    searchList(1, router.query.facltNm);
    imageList(1, router.query.id);
  }, []);

  async function searchList(pageNo = 1, facltNm) {
    const data = await getSearchList(pageNo, facltNm);
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
          <KakaoAPI
            long={router.query.mapX}
            lati={router.query.mapY}
            marginH={10}
          />
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
  width: calc(100vw - 22vw * 2);
  height: auto;
  margin: 0vw 22vw;
  align-items: center;
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

export default content;
