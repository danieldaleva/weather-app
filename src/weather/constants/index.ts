/*
  Openweather api
  */
export const API_URL = 'https://api.openweathermap.org/data/2.5';
export const API_KEY = 'b5499e43c45d4a215393b8fc8b464e1e';
export const WEATHER_ENDPOINT = '/weather';

/**
 * It is allowed to call the API after (in minutes):
 */
export const REFRESH_TIME = 1;

/**
 * Weather Icon File Name List
 */
export const weatherAppIcons: string[] = [
  'i200_201_202',
  'i200_201_202a11d',
  'i200_201_202a11n',
  'i201_211_212_221_230_231_232a02d',
  'i201_211_212_221_230_231_232a02n',
  'i500',
  'i500a10d',
  'i500a10n',
  'i501_502a10d',
  'i501_502a10n',
  'i503_504a10d',
  'i503_504a10n',
  'i503_504',
  'i520',
  'i520a09d',
  'i520a09n',
  'i521_531',
  'i521_531a09d',
  'i521_531a09n',
  'i522',
  'i522a09d',
  'i522a09n',
  'i600',
  'i600a13d',
  'i600a13n',
  'i601_602_611',
  'i601_602_611a13d',
  'i601_602_611a13n',
  'i701_711_721_731_741_751_761',
  'i701_711_721_731_741_751_761a50d',
  'i701_711_721_731_741_751_761a50n',
  'i771_781',
  'i771_781a50d',
  'i771_781a50n',
  'i800a01d',
  'i800a01n',
  'i801',
  'i801a02d',
  'i801a02n',
  'i802',
  'i802a03d',
  'i802a03n',
  'i803_804',
  'i803_804a04d',
  'i803_804a04n',
  'thermometer',
  'placeholder',
];

/**
 * Unit of Measure List
 */
export const units = [
  { id: 'standard', label: 'K' },
  { id: 'metric', label: '°C' },
  { id: 'imperial', label: '°F' },
];

/**
 * can be 'standard' (in kelvin), 'metric' (°C), 'imperial' (°F)
 */
export const defaultUnit = { id: 'metric', label: '°C' };
