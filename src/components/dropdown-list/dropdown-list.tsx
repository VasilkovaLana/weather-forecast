import React, { FC } from 'react';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

const AutoContainer = styled.div`
  position: absolute;
  top: 34px;
  width: -webkit-fill-available;
  grid-column: 1/4;
  background: #eceef2;
  color: #9ba4b6;
  font-weight: 400;
  font-size: 16px;
  opacity: 0;
  animation: 0.5s ${fadeIn} 0.3s both;
`;

const Option = styled.p<{ active: boolean }>`
  cursor: pointer;
  font-family: Arial, sans-serif;
  padding: 9px 0 12px 9px;
  margin: 0;
  background: ${(props) => (props.active ? '#cbd9f5' : '')};
`;

export const DropdownList: FC<IDropdownList> = ({
  setCity,
  handleMouseOver,
  options,
  count,
}) => {
  const listOptions = options.map((item, index) => {
    return (
      <Option
        key={index}
        active={index === count}
        onMouseOver={() => handleMouseOver(index)}
        onClick={() => setCity(item)}
      >
        {item}
      </Option>
    );
  });

  return <AutoContainer>{listOptions}</AutoContainer>;
};

interface IDropdownList {
  options: string[];
  count?: number;
  handleMouseOver: (index: number) => void;
  setCity: (item: string) => void;
}
