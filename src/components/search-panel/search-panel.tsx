import React, { useState, ChangeEvent, FC, FormEvent, useRef } from 'react';
import { debounce } from 'lodash';
import { getDateListCities } from '../../services/weather-service';

import styled, { keyframes } from 'styled-components';
import loupe from './img/loupe.svg';

const Form = styled.form`
  display: grid;
  position: relative;
  grid-template-columns: 4fr 1fr;
  grid-column: 1/4;
  justify-self: center;
  align-self: start;
`;

const SearchInput = styled.input`
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
`;

const SearchButton = styled.button`
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
`;

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
  padding-left: 12px;
  background: #eceef2;
  color: #9ba4b6;
  font-weight: 400;
  font-size: 16px;
  opacity: 0;
  animation: 0.5s ${fadeIn} 0.3s both;
`;

const Option = styled.p`
  cursor: pointer;
  font-family: Arial, sans-serif;
`;

export const SearchPanel: FC<ISearchPanel> = ({ getDate }) => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');

  const MaxLengthList = 5;

  const delayDebounce = useRef(
    debounce((searchText: string) => {
      if (searchText.trim().length === 0) {
        setDisplay(false);
        return;
      }

      getDateListCities(searchText)
        .then((body) => onOptions(body))
        .catch((err) => console.log(err));
    }, 500)
  ).current;

  const onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    delayDebounce(e.target.value);
    setSearch(e.target.value);
    setDisplay(true);
  };

  const onOptions = (listCities: any) => {
    const cities = listCities
      .slice(0, MaxLengthList)
      .map((item: { name: string }) => item.name);

    return setOptions(cities);
  };

  const setCity = (city: string) => {
    setSearch(city);
    setDisplay(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getDate(search.trim());
    setSearch('');
    setDisplay(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <SearchInput
        type="text"
        placeholder="Введите город"
        value={search}
        onChange={onValueChange}
        autoFocus={true}
      />
      <SearchButton type="submit" />
      {display && (
        <AutoContainer>
          {options.map((item: any, index) => {
            return (
              <Option
                className="option"
                key={index}
                onClick={() => setCity(item)}
                tabIndex={0}
              >
                {item}
              </Option>
            );
          })}
        </AutoContainer>
      )}
    </Form>
  );
};

interface ISearchPanel {
  getDate: (value: string) => void;
}
