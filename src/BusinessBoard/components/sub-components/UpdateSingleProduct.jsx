import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import FormInputs from '../../../formHelpers/FormInputs'
import FormChoose from '../../../formHelpers/FormChoose'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function UpdateSingleProduct({ handleChange, error, onSubmit, isFormValid, handleBackButton }) {

    return (
        <>
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
                            border: "3px solid black"
                        }}
                    >
                        Add Product
                    </Button>
                </Box >
                <IconButton onClick={() => handleBackButton()} sx={{ border: '1px solid black' }}>
                    <ArrowBackIcon sx={{ fontSize: "36px" }} />
                </IconButton>
            </Box>

        </>
    )
}
