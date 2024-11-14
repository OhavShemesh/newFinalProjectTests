import { Box, Button, FormHelperText, IconButton, Input, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export default function FormInputsForProfile({ label, inputNames, handleChange, error, width, details }) {
    const [editMode, setEditMode] = useState(false);

    const handleFitToSchema = (name) => {
        const nameMap = {
            firstname: "first",
            middlename: "middle",
            lastname: "last",
            phonenumber: "phone",
            imageurl: "url",
            imagealt: "alt",
            housenumber: "houseNumber",
            city: "city",
            street: "street",
            zip: "zip"
        };
        return nameMap[name] || name;
    };

    return (
        <Box sx={{ py: "2%", width: width || "100%", display: "flex", alignItems: { xs: "center", sm: "center", md: "flex-start" }, gap: { xs: 1, sm: 1, md: 0 }, flexDirection: { xs: "column", sm: "column", md: "row" }, margin: "auto" }}>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "20%" }, ml: "2%", display: 'flex', alignItems: 'center', justifyContent: { xs: "center", sm: "center", md: "flex-start" }, mb: { xs: 1, sm: 1, md: 0 } }}>
                <Typography sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}>
                    {label}:
                </Typography>
            </Box>
            <Box sx={{ display: "flex", width: { xs: "100%", sm: "100%", md: "80%" }, gap: "2%", mr: "2%" }}>
                {inputNames?.map((inputName, index) => {
                    const schemaName = handleFitToSchema(inputName.toLowerCase().replace(/\s+/g, ''));
                    const displayValue = details?.[inputName] || "";

                    return (
                        <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: `${100 / inputNames.length}%` }}>
                            {editMode ? (
                                <>
                                    <Input
                                        type="text"
                                        error={Boolean(error?.[schemaName])}
                                        onChange={(e) => handleChange(e)}
                                        name={schemaName}
                                        placeholder={inputName}
                                        sx={{
                                            backgroundColor: "lightgrey",
                                            width: "100%",
                                            height: { xs: '30px', sm: 'auto' },
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: { xs: "0.5rem", sm: "0.7rem", md: "1rem" }
                                        }}
                                        inputProps={{
                                            style: {
                                                textAlign: "center",
                                                color: "gray",
                                                display: 'flex',
                                                alignItems: 'center',
                                            },
                                            placeholder: inputName,
                                            sx: {
                                                "&::placeholder": {
                                                    color: "grey",
                                                    opacity: 1,
                                                    fontSize: { xs: schemaName === "houseNumber" ? "0.6rem" : "0.8rem", sm: "0.6rem", md: "1rem" }
                                                },
                                            },
                                        }}
                                    />
                                    <FormHelperText sx={{ fontSize: { xs: "0.3rem", sm: "0.5rem", md: "0.7rem" } }} error={Boolean(error?.[schemaName])}>
                                        {error?.[schemaName]}
                                    </FormHelperText>
                                </>
                            ) : (
                                <Typography variant="body1" sx={{
                                    textAlign: "center", width: "100%", borderBottom: "1px solid", borderColor: "black", height: "30px", display: "flex", justifyContent: "center", alignItems: schemaName === "url" ? "flex-start" : "center", backgroundColor: "lightgrey", overflowY: "auto", overflowX: "hidden", color: "#000000",
                                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem" },
                                }}>
                                    {displayValue}
                                </Typography>
                            )}
                        </Box>
                    );
                })}
            </Box>
            <IconButton onClick={() => setEditMode(!editMode)} sx={{ height: "30px", fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}>
                <EditIcon />
            </IconButton>
        </Box>
    );
}
