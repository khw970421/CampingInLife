import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import { SearchCamping } from "@/core/utils/types.d";
import Button from "@/components/Button/Button";

interface UlStyled {
  width: number;
  height: number;
  borderRadius?: number;
}

interface LiStyled extends UlStyled {
  isFocus?: boolean;
}

interface InputProps {
  id: string;
  searchCamping: SearchCamping[];
  isSearching: boolean;
  changeInputValue: (event: React.ChangeEvent) => void;
  checkSearchPressEnter: (
    event: React.MouseEvent,
    idx: number,
    facltNm?: string,
    contentId?: string
  ) => void;
  handleClearSearchData: () => void;
  closeSearchBar: () => void;
  width?: number;
  height?: number;
  borderRadius?: number;
  placeholder?: string;
}

export default memo(function Input({
  searchCamping,
  isSearching,
  changeInputValue,
  checkSearchPressEnter,
  handleClearSearchData,
  width = 20,
  height = 50,
  borderRadius = 20,
  id,
  closeSearchBar,
  placeholder,
}: InputProps) {
  let timer;
  const router = useRouter();
  const inputRef = useRef();
  const [idx, setIdx] = useState(-1);

  const handleDebounce = (e) => {
    if (timer) {
      clearTimeout(timer); // 0.5초 미만으로 입력이 주어질 경우 해당 timer를 clear(없앤다)한다.
    }
    timer = setTimeout(() => {
      changeInputValue(e);
    }, 500);
  };
  function handleCheckKeyUp(e) {
    if (e.key === "ArrowDown" && searchCamping.length !== 0) {
      const nIdx = (idx + 1) % searchCamping.length;
      setIdx(nIdx);
    } else if (e.key === "ArrowUp" && searchCamping.length !== 0) {
      const nIdx = (idx - 1) % searchCamping.length;
      setIdx(nIdx < 0 ? nIdx + searchCamping.length : nIdx);
    } else if (e.key === "Enter") {
      checkSearchPressEnter(
        e,
        idx,
        searchCamping[idx]?.facltNm,
        searchCamping[idx]?.contentId
      );
      closeSearchBar()
    }
  }

  const clickSearch = ({ contentId, facltNm }) => {
    router.push(`/content/${contentId}?keyword=${facltNm}`);
    closeSearchBar()
  };

  useEffect(() => {
    setIdx(-1);
  }, [searchCamping]);

  return (
    <InputWrapper>
      <Button btnText="X" clickBtn={closeSearchBar} id={"searchCloseBtn"} width={5} paddingH={0.5} paddingV={0.5} />
      <InputTagContainer>
        <ImSearchContainer>
          <ImSearch />
        </ImSearchContainer>
        <InputTag
          id={id}
          ref={inputRef}
          onChange={handleDebounce}
          onBlur={handleClearSearchData}
          width={width}
          height={height}
          onKeyUp={handleCheckKeyUp}
        ></InputTag>
      </InputTagContainer>
      <Ul width={width} height={height} borderRadius={borderRadius}>
        {searchCamping?.map(({ facltNm, contentId }, liIdx) => {
          return (
            <Li
              key={contentId}
              onMouseDown={() => clickSearch({ contentId, facltNm })}
              width={width}
              height={height}
              isFocus={idx == liIdx}
            >
              {facltNm}
            </Li>
          );
        })}
        <Li
          width={width}
          height={5}
          borderRadius={borderRadius}
        ></Li>
      </Ul>
    </InputWrapper>
  );
});

const InputWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

  width:60%;
  height:100vh;
  padding: 0 20%;
  
  position:absolute;
  top:0;
  left:0;
  z-index:50;
  background-color:white;
  `

const InputTagContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  position:relative;
`;

const ImSearchContainer = styled.div`
  position: absolute;
  left: 10px;
  padding: 0px 10px 0px 0px;
`;

const InputTag = styled.input`
  border: 0px;
  width: 100%;
  border-radius: 999px;
  border: 1px solid;
  height: ${({ height }) => `${height}px`};
  padding: 0 2rem;

  :focus {
    outline: none;
  }
`;

const Ul = styled.ul<UlStyled>`
  width: 60%;
  padding:0px;
`;

const Li = styled.li<LiStyled>`
  list-style: none;
  box-sizing: border-box;
  font-size: 1em;
  background: ${({ isFocus }) => (isFocus ? "#d9d9d9" : "#fff")};
  cursor: pointer;
  padding: 0.5rem 1rem;

  :hover{
    background:#d9d9d9
  }
`;
