const ApiBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
const ApiKey = '&lang=ru&units=metric&appid=0f49363de5af37c512e1a84dd3bab4dd';

const getResource = async (url: string) => {
  const response: any = await fetch(url);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(`Whoops, ${body.message}`);
  }

  return body;
};

export const getDateWeather = async (city: string) => {
  const result = await getResource(`${ApiBase}${city}${ApiKey}`);

  return transformDateWeather(result);
};

const transformDateWeather = (date: ItransformDateWeather) => {
  console.log(date);

  return {
    icon: date.weather[0].icon,
    description: date.weather[0].description,
    windSpeed: [+date.wind.speed.toFixed(1)],
    temperature: [Math.round(date.main.temp)],
    feelsLike: [Math.round(date.main.feels_like)],
    pressure: date.main.pressure,
    humidity: date.main.humidity,
    name: date.name,
  };
};

interface ItransformDateWeather {
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  name: string;
}
