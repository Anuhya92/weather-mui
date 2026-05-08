import React from "react";
import { Card, CardContent, Typography, Box, Chip, Divider} from "@mui/material";
import { WeatherData } from "../types";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%)",
        color: "white",
        maxWidth: 400,
        mx: "auto",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {" "}
        {/* p = padding, 3 = 24px */}
        {/* City name + emoji row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 700, color: "white" }}
          >
            {weather.city}
          </Typography>

          {/* Big weather emoji */}
          <Typography variant="h2" sx={{ lineHeight: 1 }}>
            {weather.emoji}
          </Typography>
        </Box>
        {/* Temperature - very large */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "white",
            fontSize: { xs: "3.5rem", sm: "4.5rem" }, 
            lineHeight: 1,
            mb: 1,
          }}
        >
          {weather.temperature}°C
        </Typography>
        {/* Weather description as a Chip (badge) */}
        <Chip
          label={weather.description}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)", 
            color: "white",
            fontWeight: 600,
            mb: 2,
          }}
        />
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
        {/* Extra details row */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}
            >
              Wind Speed
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "white", fontWeight: 600 }}
            >
              {weather.windspeed} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
