import { Autocomplete, TextField, Box } from "@mui/material";

type Props = {
  options: string[];
  onSelect: (city?: string | null) => void;
};

export default function CitySelector({ options, onSelect }: Props) {
  return (
    <Box sx={{ width: { xs: "100%", sm: 220 } }}>
      <Autocomplete
        size="medium"
        options={options}
        onChange={(_, value) => onSelect(value ?? null)}
        clearOnEscape
        renderInput={(params) =>( 
        <TextField {...params} label="Choose city" 
        sx={{
              "& .MuiInputBase-root": {
                height: 56,
                boxSizing: "border-box",
              },
            }}
        />)}
      />
    </Box>
  );
}
