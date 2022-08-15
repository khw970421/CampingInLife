import styled from "styled-components";
import CampContainer from "../component/CampContainer";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
} from "../core/api/axios";
import returnTitle from "../core/utils/mainPage";
import Button from "../component/Button";
import Input from "../component/Input";
import SelectBox from "../component/SelectBox";

export default function Home() {
  const [titleTag, setTitleTag] = useState("nogps");
  const [campData, setCampData] = useState([]);
  const pageNo = useRef(1);

  const [gpsData, setGpsData] = useState({});
  const gpsRange = useRef(1000);

  const [searchArr, setSearchArr] = useState([]);
  const searchKey = useRef("");

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    // GPS Data 여부에 따라 API 분기 실행
    if (Object.keys(gpsData).length !== 0) locationBasedList();
    else basedList();
  }, [gpsData]);

  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setGpsData({
            lati: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }

  async function basedList(pageNo = 1) {
    const data = await getBasedList(pageNo);
    setTitleTag("nogps");

    // 요청받은 API는 없고 pageNo는 첫번째 페이지가 아닐때
    if (data.length === 0 && pageNo !== 1) {
      alert("더보기 캠핑 목록이 없습니다.");
    } else setCampData([...campData, ...data]);
  }

  async function locationBasedList(pageNo = 1, radius = 10000) {
    const data = await getLocationBasedList(
      pageNo,
      gpsData.long,
      gpsData.lati,
      radius
    );
    setTitleTag("gps");

    if (pageNo === 1) {
      setCampData(data);
    } else if (data.length === 0 && pageNo !== 1) {
      alert("더보기 캠핑 목록이 없습니다.");
    } else setCampData([...campData, ...data]);
  }

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

  // Header 검색 기능
  const changeSearchValue = async ({ target }) => {
    const list = await getSearchList(1, target.value);
    const filterList = list.map(({ facltNm }) => facltNm);
    setSearchArr(filterList);
  };

  const checkSearchPressEnter = ({ target, key }) => {
    if (key === "Enter") {
      searchList(1, target.value);
    }
  };

  // 더보기 기능
  const clickAddBtn = () => {
    if (titleTag === "nogps") {
      pageNo.current++;
      basedList(pageNo.current);
    } else if (titleTag === "gps") {
      pageNo.current++;
      locationBasedList(pageNo.current, gpsRange.current);
    } else if (titleTag === "searchKey") {
      pageNo.current++;
      searchList(pageNo.current, searchKey.current);
    }
  };

  // GPS 범위 기능
  const changeSelectBoxOption = ({ target }) => {
    gpsRange.current = parseInt(target.value) * 1000;
    pageNo.current = 1;
    locationBasedList(pageNo.current, gpsRange.current);
  };

  return (
    <div>
      <Header>
        <ImgContainer>
          <Img src="mainlogo.png"></Img>
        </ImgContainer>
        <Input
          changeInputValue={changeSearchValue}
          searchArr={searchArr}
          checkSearchPressEnter={checkSearchPressEnter}
        ></Input>
        <HamburgerContainer>
          <GiHamburgerMenu size="50" />
        </HamburgerContainer>
      </Header>
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
          <CampContainer campData={campData} />
          {campData.length !== 0 ? (
            <Button
              id={"backgroundLightMainColor"}
              width={30}
              height={60}
              btnText={"더보기"}
              click={clickAddBtn}
            ></Button>
          ) : (
            <div>검색 결과가 없습니다. </div>
          )}
        </Main>
      </Body>
    </div>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 10vw;
  min-width: 100px;
  margin: 20px;
`;

const Img = styled.img`
  width: 100%;
`;

const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 10vw;
  margin: 20px;
`;

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
