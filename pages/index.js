import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
} from "@/core/api/axios";
import { useRouter } from "next/router";

import { returnTitle, getLocation } from "@/core/utils/mainPage";

import {
  Header,
  CampTile,
  Button,
  SelectBox,
  Footer,
} from "@/components/index.js";

export default function Home() {
  const [titleTag, setTitleTag] = useState("nogps");
  const [campData, setCampData] = useState([]);
  const pageNo = useRef(1);
  const [gpsData, setGpsData] = useState({});
  const gpsRange = useRef(10000);
  const gpsCheck = useRef(false);

  const [searchArr, setSearchArr] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchKey = useRef("");

  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    getLocation(setGpsData, gpsCheck);
  }, []);
  useEffect(() => {
    // GPS Data 여부에 따라 API 분기 실행
    if (Object.keys(gpsData).length === 0 && gpsCheck.current) {
      basedList();
    } else if (Object.keys(gpsData).length !== 0 && gpsCheck.current) {
      locationBasedList();
    }
  }, [gpsData]);

  // Header 검색 기능
  const changeSearchValue = useCallback(async ({ target }) => {
    if (target.value !== "") {
      const list = await getSearchList(1, target.value);
      const filterList = list.map(({ facltNm, contentId, mapX, mapY }) => ({
        facltNm,
        contentId,
        mapX,
        mapY,
      }));

      setIsSearching(true);
      setSearchArr(filterList);
    } else {
      setIsSearching(false);
      setSearchArr([]);
    }
  }, []);

  const checkSearchPressEnter = useCallback(
    ({ target, key }, idx, facltNm, contentId) => {
      if (idx === -1) {
        searchList(1, target.value);
        setSearchArr([]);
        setIsSearching(false);
      } else {
        router.push(`/content/${contentId}?keyword=${facltNm}`);
      }
    },
    []
  );

  const clearSearchArr = useCallback(() => {
    setSearchArr([]);
    setIsSearching(false);
  }, []);

  // API 기능 : basedList
  async function basedList(pageNo = 1) {
    const data = await getBasedList(pageNo);
    setTitleTag("nogps");
    // 요청받은 API는 없고 pageNo는 첫번째 페이지가 아닐때
    if (data?.length === 0 && pageNo !== 1) {
      alert("더보기 캠핑 목록이 없습니다.");
    } else if (data !== undefined) setCampData([...campData, ...data]);
  }

  // API 기능 : locationBasedList
  async function locationBasedList(pageNo = 1) {
    const gpsInfo = {
      mapX: gpsData.long,
      mapY: gpsData.lati,
      radius: gpsRange.current,
    };

    const data = await getLocationBasedList(pageNo, gpsInfo);
    setTitleTag("gps");

    if (pageNo === 1) {
      setCampData(data);
    } else if (data.length === 0 && pageNo !== 1) {
      alert("더보기 캠핑 목록이 없습니다.");
    } else setCampData([...campData, ...data]);
  }

  // API 기능 : searchList
  async function searchList(pageNo, value) {
    const list = await getSearchList(pageNo, value);
    setTitleTag("searchKey");

    searchKey.current = value;
    // Todo : 검색이 좀 더 빠를때 searchArr 수정이 안된다. (useEffect로 처리할 필요 있다.)
    setSearchArr([]);

    if (pageNo === 1) {
      setCampData(list);
    } else if (list.length === 0 && pageNo !== 1) {
      alert("더보기 캠핑 목록이 없습니다.");
    } else setCampData([...campData, ...list]);
  }

  // 더보기 기능
  const clickBtn = () => {
    pageNo.current++;

    switch (titleTag) {
      case "nogps":
        basedList(pageNo.current);
        break;
      case "gps":
        locationBasedList(pageNo.current);
        break;
      case "searchKey":
        searchList(pageNo.current, searchKey.current);
        break;
      default:
        alert(`더보기 기능에 문제가 발생했습니다.`);
        pageNo.current--;
        break;
    }
  };

  // GPS 범위 기능
  const changeSelectBoxOption = ({ target }) => {
    gpsRange.current = parseInt(target.value) * 1000;
    pageNo.current = 1;
    locationBasedList(pageNo.current);
  };

  return (
    <>
      <Header
        isInputExist={true}
        searchArr={searchArr}
        changeInputValue={changeSearchValue}
        checkSearchPressEnter={checkSearchPressEnter}
        clearSearchArr={clearSearchArr}
        isSearching={isSearching}
      />
      <Body id="backgroundLightGray">
        <Main>
          <Title>
            <TitleText width={15} height={30}>
              {returnTitle(titleTag, searchKey.current)}
            </TitleText>
            {titleTag === "gps" && (
              <SelectBox
                optionsTitle={"범위 설정"}
                options={["1km", "5km", "10km", "20km"]}
                changeSelectBoxOption={changeSelectBoxOption}
              />
            )}
          </Title>
          <CampTile campData={campData} isHoverActive={!isSearching} />
          {campData.length !== 0 ? (
            <Button
              id={"backgroundLightMainColor"}
              width={30}
              height={60}
              marginH={20}
              btnText={"더보기"}
              clickBtn={clickBtn}
            ></Button>
          ) : (
            <div> 검색 결과가 없습니다. </div>
          )}
        </Main>
      </Body>
      <Footer />
    </>
  );
}

const TitleText = styled.div`
  margin: 20px;
  min-width: 150px;
`;

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
