import React from "react";
import styled from "styled-components";

const SelectBox = ({
  optionsTitle = "optionsTitle",
  options = [],
  changeSelectBoxOption,
}) => {
  return (
    <select name="job" onChange={changeSelectBoxOption}>
      <option value={optionsTitle} disabled selected>
        {optionsTitle}
      </option>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default SelectBox;
