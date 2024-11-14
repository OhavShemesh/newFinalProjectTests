import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function FormChoose({ label, handleChange, width, currentCategory }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        handleChange(event);
    };

    return (
        <Box sx={{ py: "2%", width: { width }, display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "column", md: "row" }, margin: "auto" }}>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "20%" }, ml: "2%", display: 'flex', alignItems: 'center', justifyContent: { xs: "center", sm: "center", md: "flex-start" }, mb: { xs: 1, sm: 1, md: 0 } }}>
                <Typography sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem" } }}>{label}:</Typography>
            </Box>
            <Box sx={{ display: "flex", width: "80%", gap: "2%", mr: "2%" }}>
                <FormControl fullWidth variant="filled" >
                    <InputLabel
                        sx={{
                            fontSize: { xs: "0.7rem", sm: "0.7rem", md: "1rem" },
                            lineHeight: { xs: '0.2rem', sm: '0.5rem', md: '1rem' },
                            overflow: "visible"
                        }}
                        id="demo-simple-select-filled-label"
                    >
                        {currentCategory || "Select Category"}
                    </InputLabel>
                    <Select
                        sx={{
                            backgroundColor: "lightgrey",
                            height: { xs: '30px', sm: '35px', md: '40px' },
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }
                        }}
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={selectedValue}
                        name={label.toLowerCase()}
                        onChange={(e) => handleSelectChange(e)}
                    >
                        <MenuItem sx={{ fontSize: { xs: "0.7rem", sm: "0.7rem", md: "1rem" } }} value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem sx={{ fontSize: { xs: "0.7rem", sm: "0.7rem", md: "1rem" } }} value={"Furniture"}>Furniture</MenuItem>
                        <MenuItem sx={{ fontSize: { xs: "0.7rem", sm: "0.7rem", md: "1rem" } }} value={"Electronics"}>Electronics</MenuItem>
                        <MenuItem sx={{ fontSize: { xs: "0.7rem", sm: "0.7rem", md: "1rem" } }} value={"Tools"}>Tools</MenuItem>
                        <MenuItem sx={{ fontSize: { xs: "0.7rem", sm: "0.7rem", md: "1rem" } }} value={"Garden"}>Garden</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
