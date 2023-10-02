import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { SearchCamping } from "@/core/utils/types.d";
import Button from "@/components/Button/Button";

interface LiStyled {
  isFocus: boolean;
}

interface InputProps {
  searchCamping: SearchCamping[];
  isSearching: boolean;
  changeInputValue: (event: React.ChangeEvent) => void;
  checkSearchPressEnter: (
    event: React.MouseEvent,
    idx: number,
    facltNm: string | null,
    contentId: string | null
  ) => void;
  handleClearSearchData: () => void;
  closeSearchBar: () => void;
  placeholder?: string;
}

export default memo(function Input({
  searchCamping,
  isSearching,
  changeInputValue,
  checkSearchPressEnter,
  handleClearSearchData,
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
      const facltNm = searchCamping ? searchCamping[idx]?.facltNm : null;
      const contentId = searchCamping ? searchCamping[idx]?.contentId : null;

      clearTimeout(timer)
      checkSearchPressEnter(
        e,
        idx,
        facltNm,
        contentId
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
    <InputWrapper id="campingSearchInputWrapper" className="z-index-5">
      <Button id="searchCloseBtn" btnText={<IoMdClose size="50" />} clickBtn={closeSearchBar} />
      <InputTagContainer>
        <ImSearchContainer>
          <ImSearch />
        </ImSearchContainer>
        <InputTag
          ref={inputRef}
          onChange={handleDebounce}
          onBlur={handleClearSearchData}
          onKeyUp={handleCheckKeyUp}
          placeholder={placeholder}
        ></InputTag>
      </InputTagContainer>
      <Ul>
        {searchCamping?.map(({ facltNm, contentId }, liIdx) => {
          return (
            <Li
              key={contentId}
              onMouseDown={() => clickSearch({ contentId, facltNm })}
              isFocus={idx == liIdx}
            >
              {facltNm}
            </Li>
          );
        })}
      </Ul>
    </InputWrapper>
  );
});

const InputWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

  height:100vh;
  
  position:absolute;
  top:0;
  left:0;
  background-color:white;
  `

const InputTagContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  position:relative;
`;

const ImSearchContainer = styled.div`
  position: absolute;
  left: 10px;
  padding: 0px 10px 0px 0px;
`;

const InputTag = styled.input`
  width: 100%;
  border-radius: 999px;
  height: 3rem;
  padding: 0 2rem;
  border: 0px;
  border: 1px solid;

  :focus {
    outline: none;
  }
`;

const Ul = styled.ul`
  width: 80%;
  padding:0px;
`;

const Li = styled.li<LiStyled>`
  list-style: none;
  box-sizing: border-box;
  font-size: 1em;
  background: ${({ isFocus }) => (isFocus ? "#d9d9d9" : "#fff")};
  padding: 0.5rem 1rem;
  cursor: pointer;

  :hover{
    background:#d9d9d9
  }
`;
