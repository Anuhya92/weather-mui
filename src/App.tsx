import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import WeatherCard from "./components/WeatherCard";
import { WeatherData } from "./types";

const weatherCodeMap: Record<number, { description: string; emoji: string }> = {
  0: { description: "Clear sky", emoji: "☀️" },
  1: { description: "Mainly clear", emoji: "🌤️" },
  2: { description: "Partly cloudy", emoji: "⛅" },
  3: { description: "Overcast", emoji: "☁️" },
  45: { description: "Fog", emoji: "🌫️" },
  48: { description: "Depositing rime fog", emoji: "🌁" },
  51: { description: "Drizzle", emoji: "🌦️" },
  53: { description: "Moderate drizzle", emoji: "🌧️" },
  61: { description: "Rain", emoji: "🌧️" },
  63: { description: "Rain", emoji: "🌧️" },
  71: { description: "Snow", emoji: "❄️" },
  80: { description: "Rain showers", emoji: "🌦️" },
  95: { description: "Thunderstorm", emoji: "⛈️" },
};

const getWeatherMeta = (code: number) =>
  weatherCodeMap[code] ?? { description: "Unknown", emoji: "❓" };

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (weather) {
      document.title = `Weather • ${weather.city}`;
    }
  }, [weather]);

  const fetchWeather = async () => {
    if (!query.trim()) {
      setError("Enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoResp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query,
        )}&count=1`,
      );
      const geoJson = await geoResp.json();

      if (!geoJson.results || geoJson.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name } = geoJson.results[0];
      const weatherResp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
      );
      const weatherJson = await weatherResp.json();

      if (!weatherJson.current_weather) {
        throw new Error("Weather data unavailable");
      }

      const { temperature, windspeed, weathercode } =
        weatherJson.current_weather;
      const meta = getWeatherMeta(weathercode);

      setWeather({
        city: name,
        temperature: Math.round(temperature),
        windspeed: Math.round(windspeed),
        description: meta.description,
        emoji: meta.emoji,
        weathercode: weathercode,
      });
    } catch (err) {
      setError((err as Error).message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        py: 6,
        background:
          "linear-gradient(180deg, #eef2ff 0%, rgba(229, 231, 235, 0.8) 100%)",
      }}
    >
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Weather Lookup
        </Typography>
        <Typography color="text.secondary">
          Search a city and fetch live weather from Open-Meteo.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          label="City"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={fetchWeather}
          disabled={loading}
          sx={{ whiteSpace: "nowrap" }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Search"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {weather && <WeatherCard weather={weather} />}
    </Container>
  );
};

export default App;
