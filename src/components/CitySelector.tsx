import React from "react";
import {
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 

// A few preset cities with their lat/lon coordinates
const CITIES = [
  { name: "Stockholm", lat: 59.33, lon: 18.07 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Paris", lat: 48.85, lon: 2.35 },
];

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  onSearch: () => void; 
  loading: boolean;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCityChange,
  onSearch,
  loading,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, 
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
        mb: 4,
      }}
    >
      <FormControl sx={{ minWidth: 200, flex: 1 }}>
        <InputLabel id="city-label">Select City</InputLabel>

        <Select
          labelId="city-label"
          value={selectedCity}
          label="Select City"
          onChange={(e) => onCityChange(e.target.value)}
        >
          {CITIES.map((city) => (
            // MenuItem = individual <option> in the dropdown
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        onClick={onSearch}
        disabled={loading}
        sx={{
          backgroundColor: "#2d6a9f",
          "&:hover": {
            backgroundColor: "#1e3a5f", 
          },
          px: 4, 
          py: 1.5, 
          borderRadius: 2,
          fontWeight: 700,
          textTransform: "none", 
        }}
      >
        {loading ? "Loading..." : "Get Weather"}
      </Button>
    </Box>
  );
};

export default CitySelector;
