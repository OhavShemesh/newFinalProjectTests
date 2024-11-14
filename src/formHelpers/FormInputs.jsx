import { Box, FormHelperText, Input, Typography } from '@mui/material';
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
        <Box sx={{ py: "2%", width: { width }, display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "column", md: "row" }, margin: "auto" }}>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "20%" }, ml: "2%", display: 'flex', alignItems: 'center', justifyContent: { xs: "center", sm: "center", md: "flex-start" }, mb: { xs: 1, sm: 1, md: 0 } }}>
                <Typography sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem" } }}>{label}:</Typography>
            </Box>
            <Box sx={{ display: "flex", width: { xs: "90%", sm: "90%", md: "80%" }, gap: "2%", mr: "2%" }}>
                {inputNames?.map((inputName, index) => {
                    const schemaName = givenName || handleFitToSchema(inputName.toLowerCase().replace(/\s+/g, ''));
                    return (
                        <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: `${100 / inputNames.length}%`, height: "100%" }}>
                            <Input
                                type={inputName}
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
                                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" }
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
                                            fontSize: { xs: schemaName === "houseNumber" ? "0.5rem" : "0.7rem", sm: schemaName === "houseNumber" ? "0.6rem" : "0.8rem", md: "1rem" }
                                        },
                                    },
                                }}
                            />
                            <FormHelperText sx={{ fontSize: { xs: "0.3rem", sm: "0.5rem", md: "0.7rem" } }} error={Boolean(error?.[schemaName])}>
                                {error?.[schemaName]}
                            </FormHelperText>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
