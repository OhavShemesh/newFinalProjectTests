import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

export default function UpdateStockComponent({ products, editProductId, handleEditClick, newStock, setNewStock, handleSave, addStock, setAddStock, handleEditAddClick, editAddProductId, handleAddToStock }) {


  return (
    <TableContainer component={Paper}>
      <Box sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "10%" }}>Product Image</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "10%" }}>Product Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", paddingLeft: "50%" }}>Add Stock</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>Product in Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} sx={{ height: 60 }}>
                <TableCell align="center" sx={{ width: "10%" }}>
                  <img
                    src={product.image.url}
                    alt={product.image.alt}
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
                <TableCell sx={{ width: "10%" }} align="center">{product.name}</TableCell>
                <TableCell sx={{ paddingLeft: "50%" }} align="center">
                  {editAddProductId === product._id ? (
                    <Box display="flex" justifyContent="center">
                      <TextField
                        type="number"
                        value={addStock}
                        onChange={(e) => setAddStock(e.target.value)}
                        size="small"
                        variant="outlined"
                        sx={{ width: "80px" }}
                      />
                      <IconButton onClick={() => handleAddToStock(product._id)} sx={{ marginLeft: 1 }}>
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <span onClick={() => handleEditAddClick(product)}>
                      0
                    </span>
                  )}
                </TableCell>
                <TableCell align="center">
                  {editProductId === product._id ? (
                    <Box display="flex" justifyContent="center">
                      <TextField
                        type="number"
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                        size="small"
                        variant="outlined"
                        sx={{ width: "80px" }}
                      />
                      <IconButton onClick={() => handleSave(product._id)} sx={{ marginLeft: 1 }}>
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <span onClick={() => handleEditClick(product)}>
                      {product.inStock}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
