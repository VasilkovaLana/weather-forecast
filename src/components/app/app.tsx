import React, { FC, useState, useEffect } from 'react';
import { getDateWeather } from '../../services/weather-service';
import { SearchPanel } from '../search-panel/search-panel';
import { Content } from '../content/content';

import styled from 'styled-components';
import sky from './img/sky.png';
import cloudDark from './img/cloud-dark.svg';

const Wrapper = styled.main<{ beginin: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  padding: 2em;
  height: 578px;
  width: 794px;
  position: relative;
  background: url(${(props) => (props.beginin ? cloudDark : '')}) no-repeat;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${sky}) no-repeat;
    background-size: cover;
    filter: blur(8px);
    z-index: -1;
  }
`;

const App: FC = () => {
  const [infoCity, setInfoCity] = useState({});
  const [loading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let [beginin, setBeginin] = useState(true);

  useEffect(() => {
    const lastCity: any = localStorage.getItem('city');

    if (!lastCity) return;
    setBeginin(false);

    getDateWeather(lastCity)
      .then((body) => onInfoLoaded(body))
      .catch((error) => onError(error));
  }, []);

  const onError = (error: { message: string }) => {
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

    localStorage.setItem('city', cityName);
    setBeginin(false);

    getDateWeather(cityName)
      .then((body) => onInfoLoaded(body))
      .catch((error) => onError(error));
  };

  return (
    <Wrapper beginin={beginin}>
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
