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

export default function Home() {
  // Todos : 추후 gpsData 적용
  const [gpsData, setGpsData] = useState({});
  const [campData, setCampData] = useState([]);
  const [titleTag, setTitleTag] = useState("nogps");
  const [searchArr, setSearchArr] = useState([]);
  const gpsRange = useRef(1000);
  const pageNo = useRef(1);

  useEffect(() => {
    getLocation();
  }, []);

  async function locationBasedList(pageNo = 1, radius = 10000) {
    console.log("gps api");
    const data = await getLocationBasedList(
      pageNo,
      gpsData.long,
      gpsData.lati,
      radius
    );
    setTitleTag("gps");
    if (pageNo === 1) {
      setCampData(data);
    } else setCampData([...campData, ...data]);
  }

  async function basedList(pageNo = 1) {
    console.log("gps api X");
    const data = await getBasedList(pageNo);
    setTitleTag("nogps");
    setCampData([...campData, ...data]);
  }

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

  const checkEnter = ({ key, target }) => {
    if (key === "Enter") {
      const numValue = Number(target.value);

      if (isNaN(numValue)) {
        alert("숫자를 입력하세요. ");
      } else if (numValue < 1000) {
        alert("최소 범위는 1000 이상 입니다. ");
      } else if (numValue > 50000) {
        alert("최대 범위는 50000 이하 입니다. ");
      } else {
        gpsRange.current = numValue;
        pageNo.current = 1;
        locationBasedList(pageNo.current, gpsRange.current);
      }
    }
  };

  //  Todos : 더보기가 더는 가져오지 못할때에 대한 alert 처리 필요
  const click = () => {
    if (titleTag === "nogps") {
      pageNo.current++;
      basedList(pageNo.current);
    } else if (titleTag === "gps") {
      pageNo.current++;
      locationBasedList(pageNo.current, gpsRange.current);
    }
  };

  const changeInputValue = async ({ target }) => {
    const list = await getSearchList(1, target.value);
    const filterList = list.map(({ facltNm }) => facltNm);
    setSearchArr(filterList);
  };
  return (
    <div>
      <Header>
        <ImgContainer>
          <Img src="mainlogo.png"></Img>
        </ImgContainer>
        <Input
          changeInputValue={changeInputValue}
          searchArr={searchArr}
        ></Input>
        <HamburgerContainer>
          <GiHamburgerMenu size="50" />
        </HamburgerContainer>
      </Header>
      <Body id="backgroundLightGray">
        <Main>
          <Title>
            <TitleText width={15} height={30}>
              {returnTitle(titleTag)}
            </TitleText>
            {titleTag === "gps" && (
              <RangeInput
                placeholder="숫자로 주변 km를 설정"
                width={15}
                height={30}
                onKeyUp={checkEnter}
              ></RangeInput>
            )}
          </Title>
          <CampContainer campData={campData} />
          <Button
            id={"backgroundLightMainColor"}
            width={30}
            height={60}
            btnText={"더보기"}
            click={click}
          ></Button>
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
`;

const RangeInput = styled.input`
  border: 0.3px solid;
  border-radius: 24px;
  width: ${({ width }) => `${width}vw`};
  height: ${({ height }) => `${height}px`};
  margin: 20px;
  padding: 10px;
`;

const Body = styled.div`
  width: 100%;
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
