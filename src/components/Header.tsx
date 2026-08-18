import React from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  helperText?: string;
};

const Header: React.FC<Props> = ({
  title = "Weather Lookup",
  subtitle = "Search a city and fetch live weather from Open-Meteo.",
  helperText = "Choose a city from the list or type one manually and press Search.",
}) => {
  return (
    <Box
      component="header"
      sx={{
        mb: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{subtitle}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {helperText}
      </Typography>
    </Box>
  );
};

export default Header;
