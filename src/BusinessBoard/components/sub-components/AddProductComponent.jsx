import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FormInputs from '../../../formHelpers/FormInputs'
import FormChoose from '../../../formHelpers/FormChoose'

export default function AddProductComponent({ handleChange, error, onSubmit, isFormValid }) {
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black" }} variant='h3'>ADD NEW PRODUCT</Typography>
            <Box sx={{ width: "70%", margin: "auto", pt: 2 }}>
                <FormInputs error={error} handleChange={handleChange} label={"Name"} inputNames={["Product Name"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Description"} inputNames={["Product Description"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Price"} inputNames={["Product Price"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Image"} inputNames={["Product Image Url", "Product Image Alt"]} />
                <FormInputs error={error} handleChange={handleChange} label={"In Stock"} inputNames={["Number Of This Product In Stock"]} />
                <FormChoose error={error} handleChange={handleChange} label={"Category"} menuItems={["electronics,tools"]} />
                <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3, width: "80%" }}>

                    <Button
                        onClick={onSubmit}
                        disabled={!Boolean(isFormValid)}
                        variant='contained'
                        sx={{
                            backgroundColor: "black",
                            borderRadius: "10px",
                            width: "50%",
                            fontSize: "1rem",
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
