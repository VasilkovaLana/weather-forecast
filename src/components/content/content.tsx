import React, { FC } from 'react';
import { Spinner } from '../spinner/spinner';

interface IContentView {
  infoCity: { [key: string]: number | string };
}

interface IContent extends IContentView {
  loading: boolean;
}

export const Content: FC<IContent> = ({ infoCity, loading }) => {
  const spinner = loading ? <Spinner /> : null;
  const content = !loading ? <ContentView infoCity={infoCity} /> : null;

  return (
    <div>
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
