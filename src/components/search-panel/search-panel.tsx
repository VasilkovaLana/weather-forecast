import React, { useState, ChangeEvent, FC, FormEvent } from 'react';

import styled from 'styled-components';
import loupe from './img/loupe.svg';

const Form = styled.form`
  display: grid;
  grid-template-columns: 4fr 1fr;
  justify-self: center;
  grid-column: 1/4;
  input {
    height: 36px;
    background: #eceef2;
    border: none;
    border-radius: 5px 0 0 5px;
    font-weight: 400;
    font-size: 16px;
    color: #9ba4b6;
    padding-left: 12px;
    outline: none;

    &::placeholder {
      color: #9ba4b6;
      font-weight: 400;
      font-size: 16px;
    }
  }
  button {
    height: 38px;
    outline: none;
    position: relative;
    background: #eceef2;
    border: none;
    border-radius: 0 5px 5px 0;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 36px;
      height: 36px;
      right: 0;
      top: 0;
      background: url(${loupe}) no-repeat center;
      opacity: 0.5;
      transition: opacity 0.1s ease-out;
    }
  }
`;

export const SearchPanel: FC<ISearchPanel> = ({ getDate }) => {
  const [value, setValue] = useState('');

  const onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getDate(value);
    setValue('');
  };

  return (
    <Form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Введите город"
        value={value}
        onChange={onValueChange}
        autoFocus={true}
      />
      <button type="submit"></button>
    </Form>
  );
};

interface ISearchPanel {
  getDate: (value: string) => void;
}
