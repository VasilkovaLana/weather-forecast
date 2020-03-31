const ApiBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
const ApiKey = '&units=metric&appid=0f49363de5af37c512e1a84dd3bab4dd';

const getResource = async (url: string) => {
  const response = await fetch(url);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(`Whoops! ${response.status}`);
  }

  return body;
};

export const getDateWeather = async (city: string) => {
  const result = await getResource(`${ApiBase}${city}${ApiKey}`);

  return transformDateWeather(result);
};

const transformDateWeather = (date: ItransformDateWeather) => {
  return {
    description: date.weather[0].description,
    windSpeed: date.wind.speed,
    temperature: date.main.temp,
    feelsLike: date.main.feels_like,
    pressure: date.main.pressure,
    humidity: date.main.humidity,
    name: date.name,
  };
};

interface ItransformDateWeather {
  weather: { description: string }[];
  wind: { speed: number };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  name: string;
}
