import React, { FC } from 'react';
import { Spinner } from '../spinner/spinner';
import { ErrorIndicator } from '../error-indicator/error-indicator';
import sun from './img/sunny.svg';
import winter from './img/winter.svg';
import airHumidity from './img/humidity.svg';
import airPressure from './img/pressure.svg';

import styled from 'styled-components';

const Img = styled.img`
  grid-column: 2/3;
  justify-self: center;
  height: 100px;
`;

const Temperature = styled.p`
  grid-column: 2/3;
  justify-self: center;
  font-size: 37px;
  margin: 0;
  color: white;
`;

const WeatherItem = styled.div`
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: 4px solid white;
  img {
    height: 50px;
  }
  p {
    font-size: 25px;
    color: white;
  }
`;

interface IContentView {
  infoCity: { [key: string]: number | string };
}

interface IContent extends IContentView {
  loading: boolean;
  error: boolean;
}

export const Content: FC<IContent> = ({ infoCity, loading, error }) => {
  const hasData = !(loading || error);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorIndicator /> : null;
  const content = hasData ? <ContentView infoCity={infoCity} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const ContentView: FC<IContentView> = ({ infoCity }) => {
  const {
    windSpeed,
    temperature,
    feelsLike,
    description,
    pressure,
    humidity,
    name,
  } = infoCity;

  if (!Object.keys(infoCity).length) return <div>погода огонь</div>;

  return (
    <>
      <Img alt="description" src={sun} />
      <Temperature> {temperature} °</Temperature>
      <WeatherItem>
        <img alt="pressure" src={airPressure} />
        <p>{pressure} мм рт. ст.</p>
      </WeatherItem>
      <WeatherItem>
        <img alt="wind speed" src={winter} />
        <p>{windSpeed} м/с</p>
      </WeatherItem>
      <WeatherItem>
        <img alt="humidity" src={airHumidity} />
        <p>{humidity} %</p>
      </WeatherItem>
    </>
  );
};
