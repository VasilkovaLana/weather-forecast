import React, { FC } from 'react';
import { Spinner } from '../spinner/spinner';
import { ErrorIndicator } from '../error-indicator/error-indicator';
import winter from './img/winter.svg';
import airHumidity from './img/humidity.svg';
import airPressure from './img/pressure.svg';

import styled from 'styled-components';

const Img = styled.img`
  grid-column: 2/3;
  justify-self: center;
  height: 100px;
`;

const WeatherDescription = styled.p`
  grid-column: 2/3;
  justify-self: center;
  text-align: center;
  font-size: 25px;
  margin: 0;
  color: white;
`;

const Temperature = styled(WeatherDescription)`
  font-size: 37px;
`;

const WeatherItem = styled.div`
  grid-column: 2/3;
  display: grid;
  align-items: center;
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

export const Content: FC<IContent> = ({
  infoCity,
  loading,
  error,
  errorMessage,
}) => {
  const hasData = !(loading || error);

  const spinner = loading ? <Spinner /> : null;
  const Message = error ? <ErrorIndicator errorMessage={errorMessage} /> : null;
  const content = hasData ? <ContentView infoCity={infoCity} /> : null;

  return (
    <>
      {Message}
      {spinner}
      {content}
    </>
  );
};

const ContentView: FC<IContentView> = ({ infoCity }) => {
  const {
    icon,
    windSpeed,
    temperature,
    description,
    pressure,
    humidity,
  } = infoCity;

  if (!Object.keys(infoCity).length) return null;

  return (
    <>
      <Img
        alt="description"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
      <WeatherDescription>{description}</WeatherDescription>
      <Temperature> {temperature} °C</Temperature>
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

interface IContentView {
  infoCity: { [key: string]: number | string };
}

interface IContent extends IContentView {
  loading: boolean;
  error: boolean;
  errorMessage?: string | null;
}
