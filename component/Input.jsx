import React from "react";
import styled from "styled-components";

const Input = ({
  width = 20,
  height = 50,
  borderRadius = 20,
  placeholder,
  changeInputValue,
  clickSearch = () => {
    console.log("click");
  },
  searchArr = [],
  checkSearchPressEnter,
}) => {
  let timer;
  const debounce = (e) => {
    if (timer) {
      clearTimeout(timer); // 0.5초 미만으로 입력이 주어질 경우 해당 timer를 clear(없앤다)한다.
    }
    timer = setTimeout(() => {
      changeInputValue(e);
    }, 500);
  };

  return (
    <InputContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      searchArr={searchArr}
    >
      <InputTag
        onChange={debounce}
        width={width}
        height={height}
        borderRadius={borderRadius}
        searchArr={searchArr}
        onKeyPress={checkSearchPressEnter}
      ></InputTag>
      {searchArr.length !== 0 && (
        <>
          <Ul width={width} height={height} borderRadius={borderRadius}>
            {searchArr.map((search) => {
              return (
                <Li
                  key={search}
                  id="backgroundWhite"
                  onClick={clickSearch}
                  width={width}
                  height={height}
                >
                  {search}
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
        </>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: ${({ borderRadius, searchArr }) =>
    searchArr.length === 0
      ? `${borderRadius}px`
      : ` ${borderRadius}px ${borderRadius}px 0px 0px`};
  border: 1px solid;

  width: ${({ width }) => `${width + 5}vw`};
  height: auto;
`;

const InputTag = styled.input`
  border: 0px;

  width: ${({ width }) => `${width}vw`};
  height: ${({ height }) => `${height}px`};

  :focus {
    outline: none;
  }
`;

const Ul = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: ${({ height }) => `${height}px`};

  padding: 0px;
  margin: 0px;
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

const Li = styled.li`
  box-sizing: border-box;
  list-style: none;
  padding: 10px;

  border-radius: ${({ borderRadius = 0 }) =>
    `0px 0px ${borderRadius}px ${borderRadius}px`};

  width: ${({ width }) => `calc(${width + 5}vw - 2px)`};
  height: ${({ height }) => `${height}px`};
`;

export default Input;
