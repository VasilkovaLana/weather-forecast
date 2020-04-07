import React, { FC, useState } from 'react';
import { getDateWeather } from '../../services/weather-service';
import { SearchPanel } from '../search-panel/search-panel';
import { Content } from '../content/content';

import styled from 'styled-components';
import mountain from './img/mountain.png';

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  padding: 2em;
  height: 578px;
  width: 794px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${mountain}) no-repeat;
    background-size: cover;
    filter: blur(8px);
    z-index: -1;
  }
`;

const App: FC = () => {
  const [infoCity, setInfoCity] = useState({});
  const [loading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onError = (error: any) => {
    setErrorMessage(error.message);
    setError(true);
    setUploading(false);
  };

  const onInfoLoaded = (body: {}) => {
    setInfoCity(body);
    setUploading(false);
    setError(false);
  };

  const getDate = (cityName: string): void => {
    if (!cityName) return;
    setUploading(true);
    getDateWeather(cityName)
      .then((body) => onInfoLoaded(body))
      .catch((error) => onError(error));
  };

  return (
    <Wrapper>
      <SearchPanel getDate={getDate} />
      <Content
        infoCity={infoCity}
        loading={loading}
        error={error}
        errorMessage={errorMessage}
      />
    </Wrapper>
  );
};

export default App;
