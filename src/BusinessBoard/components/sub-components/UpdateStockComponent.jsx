import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

export default function UpdateStockComponent({ products, editProductId, handleEditClick, newStock, setNewStock, handleSave, addStock, setAddStock, handleEditAddClick, editAddProductId, handleAddToStock, toTitleCase }) {


  return (
    <Box sx={{ width: "100%" }}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold", width: "20%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, lineHeight: "1rem" }}>Product Image</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", width: "20%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, lineHeight: "1rem" }}>Product Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", paddingLeft: { xs: "5%", md: "35%" }, fontSize: { xs: "10px", sm: "12px", md: "16px" }, lineHeight: "1rem" }}>Add Stock</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", width: "5%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, lineHeight: "1rem" }}>Product in Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} sx={{ height: 60 }}>
              <TableCell align="center" sx={{ width: "20%" }}>
                <img
                  src={product?.image?.url}
                  alt={product?.image?.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    maxWidth: 60,
                    maxHeight: 60,
                    borderRadius: 4,
                  }}
                />
              </TableCell>
              <TableCell sx={{ width: "10%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">{toTitleCase(product?.name)}</TableCell>
              <TableCell sx={{ paddingLeft: { xs: "5%", md: "35%" } }} align="center">
                {editAddProductId === product?._id ? (
                  <Box display="flex" justifyContent="center">
                    <TextField
                      type="number"
                      value={addStock}
                      onChange={(e) => setAddStock(e.target.value)}
                      size="small"
                      variant="outlined"
                      sx={{ width: "55px", overflow: "visible" }}
                    />
                    <IconButton onClick={() => handleAddToStock(product?._id)} sx={{ marginLeft: 1 }}>
                      <CheckIcon sx={{ fontSize: { xs: "12px", sm: "16px", md: "24px" } }} />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" } }} onClick={() => handleEditAddClick(product)}>
                    0
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                {editProductId === product?._id ? (
                  <Box display="flex" justifyContent="center">
                    <TextField
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      size="small"
                      variant="outlined"
                      sx={{ width: { xs: "40px", sm: "60px", md: "70px" } }}
                      InputProps={{
                        sx: { fontSize: { xs: "12px", sm: "14px", md: "16px" } }
                      }}
                    />
                    <IconButton onClick={() => handleSave(product?._id)} sx={{ marginLeft: 0 }}>
                      <CheckIcon sx={{ fontSize: { xs: "12px", sm: "16px", md: "24px" } }} />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" } }} onClick={() => handleEditClick(product)}>
                    {product?.inStock}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
