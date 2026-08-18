import React from "react";
import { Box, Chip, Typography } from "@mui/material";

type Props = {
  cities: string[];
  onSelect: (city: string) => void;
};

const RecentSearches: React.FC<Props> = ({ cities, onSelect }) => {
  if (cities.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        Recent searches
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {cities.map((city) => (
          <Chip
            key={city}
            label={city}
            clickable
            onClick={() => onSelect(city)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RecentSearches;
