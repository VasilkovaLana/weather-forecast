import React, { FC } from 'react';
import { Spinner } from '../spinner/spinner';
import { ErrorIndicator } from '../error-indicator/error-indicator';

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
    <div>
      {errorMessage}
      {spinner}
      {content}
    </div>
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
      <p>скорость ветра {windSpeed} м/с</p>
      <p>температура: {temperature} °</p>
      <p>чувствуется как: {feelsLike} °</p>
      <p>описание: {description}</p>
      <p>давление: {pressure} мм рт. ст.</p>
      <p>влажность: {humidity} %</p>
      <p>город: {name}</p>
    </>
  );
};
