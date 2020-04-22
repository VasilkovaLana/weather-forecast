import React, {
  useState,
  ChangeEvent,
  FC,
  FormEvent,
  useRef,
  useEffect,
  KeyboardEvent,
} from 'react';
import { debounce } from 'lodash';
import { getDateListCities } from '../../services/weather-service';
import { DropdownList } from '../dropdown-list/dropdown-list';

import styled from 'styled-components';
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

export const SearchPanel: FC<ISearchPanel> = ({ getDate }) => {
  const [display, setDisplay] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [options, setOptions] = useState(['']);
  const [search, setSearch] = useState(localStorage.getItem('city') || '');
  let [count, setCount] = useState(-1);
  const focusTextInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusTextInput.current!.select();
    setDisplay(false);
  }, [submit]);

  const delayDebounce = useRef(
    debounce((searchText: string) => {
      if (searchText.trim().length === 0) {
        setDisplay(false);
        setCount(-1);
        return;
      }

      getDateListCities(searchText)
        .then((body) => setOptions(body))
        .catch((err) => console.log(err));

      setDisplay(true);
    }, 500)
  ).current;

  const onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const pattern = /^[a-zA-Zа-яА-яёЁ\s-]*$/;
    if (pattern.test(e.target.value)) {
      delayDebounce(e.target.value);
      setSearch(e.target.value);
    }
  };

  const setCity = (city: string) => {
    getDate(city);
    setSearch(city);
    setSubmit(!submit);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getDate(search.trim());
    focusTextInput.current!.select();
    setDisplay(false);
    setCount(-1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (display && e.key === 'ArrowDown' && count < options.length - 1) {
      e.preventDefault();
      setCount(++count);
      setSearch(options[count]);
    }
    if (display && e.key === 'ArrowUp' && count > 0) {
      e.preventDefault();
      setCount(--count);
      setSearch(options[count]);
    }
  };

  const handleMouseOver = (index: number) => {
    setCount(index);
  };

  return (
    <Form onSubmit={onSubmit}>
      <SearchInput
        type="text"
        placeholder="Введите город"
        value={search}
        onChange={onValueChange}
        autoFocus={true}
        ref={focusTextInput}
        onKeyDown={handleKeyDown}
      />
      <SearchButton type="submit" />
      {display && (
        <DropdownList
          setCity={setCity}
          handleMouseOver={handleMouseOver}
          options={options}
          count={count}
        />
      )}
    </Form>
  );
};

interface ISearchPanel {
  getDate: (value: string) => void;
}
