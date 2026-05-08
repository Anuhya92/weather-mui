// types.ts
// Shape of the data we get back from Open-Meteo API

export interface WeatherData {
  city: string;
  temperature: number; // current temp in °C
  description: string; // human readable e.g. "Clear sky"
  emoji: string; // weather emoji for visual flair
  windspeed: number; // km/h
  weathercode: number; // WMO weather code (0=clear, 61=rain, etc.)
}
