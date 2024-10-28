import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function FormChoose({ label, handleChange, width, currentCategory }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        handleChange(event);
    };

    return (
        <Box sx={{ py: "2%", width: { width }, display: "flex", alignItems: "flex-start", margin: "auto" }}>
            <Box sx={{ width: "20%", ml: "2%", display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: "bold" }}>{label}:</Typography>
            </Box>
            <Box sx={{ display: "flex", width: "80%", gap: "2%", mr: "2%" }}>
                <FormControl fullWidth variant="filled" >
                    <InputLabel id="demo-simple-select-filled-label">{currentCategory || "Select Category"}</InputLabel>
                    <Select
                        sx={{ backgroundColor: "lightgrey" }}
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={selectedValue}
                        name={label.toLowerCase()}
                        onChange={(e) => handleSelectChange(e)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Furniture"}>Furniture</MenuItem>
                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                        <MenuItem value={"Tools"}>Tools</MenuItem>
                        <MenuItem value={"Garden"}>Garden</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
