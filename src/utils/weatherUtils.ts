// utils/weatherUtils.ts
// Convert WMO weather codes to human-readable strings and emojis
// Full list: https://open-meteo.com/en/docs#weathervariables

export function getWeatherDescription(code: number): string {
  if (code === 0)              return "Clear sky";
  if (code <= 2)               return "Partly cloudy";
  if (code === 3)              return "Overcast";
  if (code <= 49)              return "Foggy";
  if (code <= 57)              return "Drizzle";
  if (code <= 67)              return "Rain";
  if (code <= 77)              return "Snow";
  if (code <= 82)              return "Rain showers";
  if (code <= 86)              return "Snow showers";
  if (code >= 95)              return "Thunderstorm";
  return "Unknown";
}

export function getWeatherEmoji(code: number): string {
  if (code === 0)              return "☀️";
  if (code <= 2)               return "⛅";
  if (code === 3)              return "☁️";
  if (code <= 49)              return "🌫️";
  if (code <= 57)              return "🌦️";
  if (code <= 67)              return "🌧️";
  if (code <= 77)              return "❄️";
  if (code <= 82)              return "🌦️";
  if (code <= 86)              return "🌨️";
  if (code >= 95)              return "⛈️";
  return "🌡️";
}

// A few preset cities with their lat/lon coordinates
export const CITIES = [
  { name: "Stockholm",  lat: 59.33, lon: 18.07 },
  { name: "London",     lat: 51.51, lon: -0.13 },
  { name: "New York",   lat: 40.71, lon: -74.01 },
  { name: "Tokyo",      lat: 35.68, lon: 139.69 },
  { name: "Sydney",     lat: -33.87, lon: 151.21 },
  { name: "Paris",      lat: 48.85, lon: 2.35 },
];
