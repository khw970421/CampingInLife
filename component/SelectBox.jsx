import React from "react";
import styled from "styled-components";

const SelectBox = ({
  optionsTitle = "optionsTitle",
  options = [],
  changeSelectBoxOption,
}) => {
  return (
    <select onChange={changeSelectBoxOption} value={optionsTitle}>
      <option value={optionsTitle} disabled>
        {optionsTitle}
      </option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
