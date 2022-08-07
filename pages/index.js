import styled from "styled-components";
import CampContainer from "../component/CampContainer";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import {
  getBasedList,
  getLocationBasedList,
  getSearchList,
} from "../core/api/axios";

export default function Home() {
  // Todos : 추후 gpsData 적용
  const [gpsData, setGpsData] = useState({});
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    async function locationBasedList() {
      console.log("gps api");
      const data = await getLocationBasedList(1, gpsData.long, gpsData.lati);
      setCampData(data);
    }

    async function basedList() {
      console.log("gps api X");
      const data = await getBasedList(1);
      setCampData(data);
    }

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
  return (
    <div>
      <Header>
        <ImgContainer>
          <Img src="mainlogo.png"></Img>
        </ImgContainer>
        <Input placeholder="어디로 갈까?" width={30} height={50}></Input>
        <HamburgerContainer>
          <GiHamburgerMenu size="50" />
        </HamburgerContainer>
      </Header>
      <Body id="backgroundLightGray">
        <Main>
          <Title>
            <div>주변캠핑장</div>
            <Input
              placeholder="숫자로 주변 km를 설정"
              width={15}
              height={30}
            ></Input>
          </Title>
          <CampContainer campData={campData} />
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

const Input = styled.input`
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
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
