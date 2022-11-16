import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";

interface SearchArrInner {
  facltNm: string;
  contentId: string;
}

interface UlStyled {
  width: number;
  height: number;
  borderRadius?: number;
}

interface LiStyled extends UlStyled {
  isFocus?: boolean;
}

interface InputContainerStyled extends UlStyled {
  isSearching: boolean;
}

interface InputProps {
  searchArr: SearchArrInner[];
  isSearching: boolean;
  changeInputValue: (event: React.ChangeEvent) => void;
  checkSearchPressEnter: (
    event: React.MouseEvent,
    idx: number,
    facltNm?: string,
    contentId?: string
  ) => void;
  clearSearchArr: () => void;
  width?: number;
  height?: number;
  borderRadius?: number;
  placeholder?: string;
}

interface LeftPaddingStyled {
  borderRadius: number;
}

export default memo(function Input({
  searchArr = [],
  isSearching,
  changeInputValue,
  checkSearchPressEnter,
  clearSearchArr,
  width = 20,
  height = 50,
  borderRadius = 20,
  placeholder,
}: InputProps) {
  let timer;
  const router = useRouter();
  const inputRef = useRef();
  const [idx, setIdx] = useState(-1);
  const debounce = (e) => {
    if (timer) {
      clearTimeout(timer); // 0.5초 미만으로 입력이 주어질 경우 해당 timer를 clear(없앤다)한다.
    }
    timer = setTimeout(() => {
      changeInputValue(e);
    }, 500);
  };
  function keyUp(e) {
    if (searchArr.length !== 0) {
      if (e.key === "ArrowDown") {
        const nIdx = (idx + 1) % searchArr.length;
        setIdx(nIdx);
      } else if (e.key === "ArrowUp") {
        const nIdx = (idx - 1) % searchArr.length;
        setIdx(nIdx < 0 ? nIdx + searchArr.length : nIdx);
      } else if (e.key === "Enter") {
        if (idx === -1) {
          checkSearchPressEnter(e, idx);
        } else {
          checkSearchPressEnter(
            e,
            idx,
            searchArr[idx].facltNm,
            searchArr[idx].contentId
          );
        }
      }
    }
  }

  const clickSearch = ({ contentId, facltNm }) => {
    router.push(`/content/${contentId}?keyword=${facltNm}`);
  };

  useEffect(() => {
    setIdx(-1);
  }, [searchArr]);

  return (
    <InputContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      isSearching={isSearching}
    >
      <InputTagContainer>
        <ImSearchContainer>
          <ImSearch />
        </ImSearchContainer>
        <InputTag
          ref={inputRef}
          onChange={debounce}
          onBlur={clearSearchArr}
          width={width}
          height={height}
          onKeyUp={keyUp}
        ></InputTag>
        <LeftPadding borderRadius={borderRadius}></LeftPadding>
      </InputTagContainer>
      {isSearching &&
        (searchArr.length !== 0 ? (
          <Ul width={width} height={height} borderRadius={borderRadius}>
            {searchArr.map(({ facltNm, contentId }, liIdx) => {
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
              id="backgroundWhite"
              width={width}
              height={5}
              borderRadius={borderRadius}
            ></Li>
          </Ul>
        ) : (
          <Ul width={width} height={height} borderRadius={borderRadius}>
            <Li id="backgroundWhite" width={width} height={height}>
              검색결과 없음
            </Li>
            <Li
              id="backgroundWhite"
              width={width}
              height={5}
              borderRadius={borderRadius}
            ></Li>
          </Ul>
        ))}
    </InputContainer>
  );
});

const InputContainer = styled.div<InputContainerStyled>`
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: ${({ borderRadius, isSearching }) =>
    isSearching
      ? ` ${borderRadius}px ${borderRadius}px 0px 0px`
      : `${borderRadius}px`};
  border: 1px solid;

  width: ${({ width }) => `${width + 5}vw`};
  height: auto;
  min-width: 200px;

  z-index: 10;
  position: relative;
`;

const LeftPadding = styled.div<LeftPaddingStyled>`
  width: ${({ borderRadius }) => `${borderRadius}px`};
  height: ${({ borderRadius }) => `${borderRadius}px`};
`;

const ImSearchContainer = styled.div`
  position: relative;
  left: 10px;
  padding: 0px 10px 0px 0px;
`;

const InputTagContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputTag = styled.input`
  border: 0px;

  padding: 0px 10px;
  width: 100%;
  height: ${({ height }) => `${height}px`};

  :focus {
    outline: none;
  }
`;

const Ul = styled.ul<UlStyled>`
  box-sizing: border-box;
  position: absolute;
  top: ${({ height }) => `${height}px`};

  padding: 0px;
  margin: 0px;
  min-width: 200px;
  width: ${({ width }) => `${width + 5}vw`};

  border-radius: ${({ borderRadius }) =>
    `0px 0px ${borderRadius}px ${borderRadius}px`};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-width: 1px;
  border-right-style: solid;
`;

const Li = styled.li<LiStyled>`
  box-sizing: border-box;
  list-style: none;
  padding: 10px;
  font-size: 1em;
  background: ${({ isFocus }) => (isFocus ? "#d9d9d9" : "#fff")};
  cursor: pointer;
  border-radius: ${({ borderRadius = 0 }) =>
    `0px 0px ${borderRadius}px ${borderRadius}px`};

  width: ${({ width }) => `calc(${width + 5}vw - 2px)`};
  min-width: 198px;
  height: ${({ height }) => `${height}px`};
`;
