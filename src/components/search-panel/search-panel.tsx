import React, { useState, ChangeEvent, FC, FormEvent } from 'react';

interface ISearchPanel {
  getDate: (value: string) => void;
}

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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="введите город или страну"
        value={value}
        onChange={onValueChange}
      />
      <button type="submit">Найти</button>
    </form>
  );
};
