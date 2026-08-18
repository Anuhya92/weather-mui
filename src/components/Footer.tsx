import React from "react";
import { Box, Typography, Link } from "@mui/material";

type Props = {
  year?: number;
};

const Footer: React.FC<Props> = ({ year = new Date().getFullYear() }) => {
  return (
    <Box component="footer" sx={{ mt: 6, pt: 3, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        Weather data provided by{" "}
        <Link
          href="https://open-meteo.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
        >
          Open-Meteo
        </Link>
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 0.5 }}
      >
        © {year} Weather Lookup
      </Typography>
    </Box>
  );
};

export default Footer;
