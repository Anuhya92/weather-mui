// components/CitySelector.tsx
// Dropdown + button to trigger the API call

import React from "react";
import {
  FormControl,   // wraps label + input for accessibility
  InputLabel,    // the floating label above select
  Select,        // dropdown component
  MenuItem,      // individual option inside Select
  Button,        // MUI button
  Box,           // layout div
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // MUI icon
import { CITIES } from "../utils/weatherUtils";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;         // ← USER EVENT: triggers the API call
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
        flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on tablet+
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
        mb: 4,
      }}
    >
      {/* MUI FormControl + Select dropdown */}
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
            backgroundColor: "#1e3a5f",  // darker on hover (sx pseudo-class)
          },
          px: 4,       // padding x-axis
          py: 1.5,     // padding y-axis
          borderRadius: 2,
          fontWeight: 700,
          textTransform: "none", // prevent ALL CAPS default
        }}
      >
        {loading ? "Loading..." : "Get Weather"}
      </Button>
    </Box>
  );
};

export default CitySelector;
