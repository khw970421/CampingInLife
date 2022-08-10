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
    <InputContainer>
      <InputTag
        onChange={debounce}
        width={width}
        height={height}
        borderRadius={borderRadius}
      ></InputTag>
      {searchArr.length !== 0 && (
        <Ul height={height} borderRadius={borderRadius}>
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
        </Ul>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputTag = styled.input`
  width: ${({ width }) => `${width}vw`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  border: 0.3px solid;
  padding: 10px;
`;
const Ul = styled.ul`
  position: absolute;
  margin-top: ${({ height }) => `${height}px`};
  padding: 0px;
  border: 1px solid;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;
const Li = styled.li`
  width: ${({ width }) => `${width}vw`};
  height: ${({ height }) => `${height}px`};
  list-style: none;
  padding: 10px;
`;
export default Input;
