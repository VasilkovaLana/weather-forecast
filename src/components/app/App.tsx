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

  const getDate = (cityName: string): void => {
    setUploading(true);
    getDateWeather(cityName)
      .then(body => {
        setInfoCity(body);
        setUploading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Wrapped>
        <SearchPanel getDate={getDate} />
        <Content infoCity={infoCity} loading={loading} />
      </Wrapped>
    </>
  );
};

export default App;
