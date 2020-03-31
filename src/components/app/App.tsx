import React, { FC, useState } from 'react';
import { getDateWeather } from '../../services/weather-service';
import { SearchPanel } from '../search-panel/search-panel';
import { Content } from '../content/content';

import styled from 'styled-components';

const Wrapped = styled.div`
  height: 100vh;
  background: #9cc3f8;
`;

export interface IInfoCity {
  windSpeed?: number;
}

const App: FC = () => {
  const [infoCity, setInfoCity] = useState({});
  const [loading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
    setUploading(false);
  };

  const onInfoLoaded = (body: {}) => {
    setInfoCity(body);
    setUploading(false);
    setError(false);
  };

  const getDate = (cityName: string): void => {
    setUploading(true);
    getDateWeather(cityName)
      .then(body => onInfoLoaded(body))
      .catch(() => onError());
  };

  return (
    <>
      <Wrapped>
        <SearchPanel getDate={getDate} />
        <Content infoCity={infoCity} loading={loading} error={error} />
      </Wrapped>
    </>
  );
};

export default App;
