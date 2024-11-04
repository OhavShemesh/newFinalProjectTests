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
        <Box sx={{ py: "2%", width: width || "100%", display: "flex", alignItems: "flex-start", margin: "auto" }}>
            <Box sx={{ width: "20%", ml: "2%", display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: "bold" }}>{label}:</Typography>
            </Box>
            <Box sx={{ display: "flex", width: "80%", gap: "2%", mr: "2%" }}>
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
                                            width: "100%"
                                        }}
                                        inputProps={{ style: { textAlign: "center" } }}
                                    />
                                    <FormHelperText error={Boolean(error?.[schemaName])}>
                                        {error?.[schemaName]}
                                    </FormHelperText>
                                </>
                            ) : (
                                <Typography variant="body1" sx={{
                                    textAlign: "center", width: "100%", borderBottom: "1px solid black", height: "30px", display: "flex", justifyContent: "center", alignItems: label === "Profile Picture" ? "start" : "center", backgroundColor: "lightgrey", overflow: "auto"
                                }}>
                                    {displayValue}
                                </Typography>
                            )}
                        </Box>
                    );
                })}
            </Box>
            <IconButton onClick={() => setEditMode(!editMode)} sx={{ height: "30px" }}>
                <EditIcon />
            </IconButton>
        </Box>
    );
}
