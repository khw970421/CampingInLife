import styled from "styled-components";
import Camp from "../component/Camp";
import CampContainer from "../component/CampContainer";

export default function Home() {
  return (
    <Body>
      <CampContainer />
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  width: calc(100vw - 22vw * 2);
  height: auto;
  margin: 22vw;
`;
