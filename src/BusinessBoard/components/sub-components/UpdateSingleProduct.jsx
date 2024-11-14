import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import FormInputs from '../../../formHelpers/FormInputs';
import FormChoose from '../../../formHelpers/FormChoose';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UpdateSingleProduct({ handleChange, error, onSubmit, isFormValid, handleBackButton, product }) {

    return (
        <>
            <Box sx={{ width: "70%", margin: "auto", pt: 2 }}>
                <FormInputs
                    error={error}
                    handleChange={handleChange}
                    label={"Name"}
                    inputNames={[product.name || ""]}
                    givenName={"name"}
                />
                <FormInputs
                    error={error}
                    handleChange={handleChange}
                    label={"Description"}
                    inputNames={[product.description || ""]}
                    givenName={"description"}
                />
                <FormInputs
                    error={error}
                    handleChange={handleChange}
                    label={"Price"}
                    inputNames={[product.price ? product.price.toString() : ""]}
                    givenName={"price"}
                />
                <FormInputs
                    error={error}
                    handleChange={handleChange}
                    label={"Image URL"}
                    inputNames={[product.image?.url || "Product Image URL"]}
                    givenName={"url"}
                />
                <FormInputs
                    error={error}
                    handleChange={handleChange}
                    label={"Image Alt"}
                    inputNames={[product.image?.alt || ""]}
                    givenName={"alt"}
                />
                <FormInputs
                    error={error}
                    handleChange={handleChange}
                    label={"In Stock"}
                    givenName={"inStock"}
                    inputNames={[product.inStock ? product.inStock.toString() : ""]}
                />
                <FormChoose
                    error={error}
                    handleChange={handleChange}
                    label={"Category"}
                    givenName={"category"}
                    menuItems={["electronics", "tools"]}
                    currentCategory={product.category || ""}
                />

                <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "center", md: "flex-end" }, my: 3, width: { xs: "100%", sm: "100%", md: "80%" } }}>
                    <Button
                        onClick={onSubmit}
                        disabled={!Boolean(isFormValid)}
                        variant='contained'
                        sx={{
                            backgroundColor: "black",
                            borderRadius: "10px",
                            width: { sx: "100%", sm: "70%", md: "50%" },
                            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                            border: "3px solid",
                            borderColor: "black"
                        }}
                    >
                        Update Product
                    </Button>
                </Box>

                <IconButton onClick={() => handleBackButton()} sx={{ border: '1px solid black' }}>
                    <ArrowBackIcon sx={{ fontSize: "36px" }} />
                </IconButton>
            </Box>
        </>
    );
}
