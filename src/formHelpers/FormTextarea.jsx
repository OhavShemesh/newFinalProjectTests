import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import React from 'react';

export default function FormInputs({ label, inputNames, handleChange, error, width, givenName }) {

    const handleFitToSchema = (name) => {
        const nameMap = {
            firstname: "first",
            middlename: "middle",
            lastname: "last",
            phonenumber: "phone",
            imageurl: "url",
            imagealt: "alt",
            housenumber: "houseNumber",
            productname: "name",
            productdescription: "description",
            productprice: "price",
            productimageurl: "url",
            productimagealt: "alt",
            numberofthisproductinstock: "inStock",
            "product'scategory": "category"
        };
        return nameMap[name] || name;
    };

    return (
        <Box sx={{ py: "2%", width: { width }, display: "flex", alignItems: "flex-start", margin: "auto" }}>
            <Box sx={{ width: "20%", ml: "2%", display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: "bold", color: "black" }}>{label}:</Typography>
            </Box>
            <Box sx={{ display: "flex", width: "80%", gap: "2%", mr: "2%" }}>
                {inputNames?.map((inputName, index) => {
                    const schemaName = givenName || handleFitToSchema(inputName.toLowerCase().replace(/\s+/g, ''));
                    return (
                        <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: `${100 / inputNames.length}%` }}>
                            <TextField
                                type={inputName}
                                error={Boolean(error?.[schemaName])}
                                onChange={(e) => handleChange(e)}
                                name={schemaName}
                                placeholder={inputName}
                                multiline
                                minRows={1}
                                sx={{
                                    backgroundColor: "lightgrey",
                                    width: "100%",
                                }}
                                inputProps={{
                                    style: {
                                        textAlign: "center",
                                        color: "gray",
                                    },
                                    placeholder: inputName,
                                    sx: {
                                        "&::placeholder": {
                                            color: "grey",
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                            <FormHelperText error={Boolean(error?.[schemaName])}>
                                {error?.[schemaName]}
                            </FormHelperText>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
