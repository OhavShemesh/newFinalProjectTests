import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FormInputs from '../../../formHelpers/FormInputs'
import FormChoose from '../../../formHelpers/FormChoose'

export default function AddProductComponent({ handleChange, error, onSubmit, isFormValid }) {
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Add Product</Typography>
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "70%" }, margin: "auto", pt: 2 }}>
                <FormInputs error={error} handleChange={handleChange} label={"Name"} inputNames={["Product Name"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Description"} inputNames={["Product Description"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Price"} inputNames={["Product Price"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Image"} inputNames={["Product Image Url", "Product Image Alt"]} />
                <FormInputs error={error} handleChange={handleChange} label={"In Stock"} inputNames={["Number Of This Product In Stock"]} />
                <FormChoose error={error} handleChange={handleChange} label={"Category"} menuItems={["electronics,tools"]} />
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
                        Add Product
                    </Button>
                </Box >
            </Box>
        </Box>
    )
}
