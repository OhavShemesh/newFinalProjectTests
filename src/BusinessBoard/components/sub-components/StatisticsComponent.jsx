import { CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function StatisticsComponent({ allProducts = [], countProductLikes }) {
    return (
        <TableContainer sx={{ width: "90%", margin: "auto", my: 3 }}>
            <Typography variant='h4' sx={{ color: 'black', fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "20px", sm: "24px", md: "32px" } }}>Likes:</Typography>
            <Table sx={{ width: "80%", margin: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: "32%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold", whiteSpace: "nowrap" }}>PRODUCT IMAGE</TableCell>
                        <TableCell align="center" sx={{ width: "32%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold", whiteSpace: "nowrap" }}>PRODUCT NAME</TableCell>
                        <TableCell align="center" sx={{ width: "32%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold", whiteSpace: "nowrap" }}>LIKES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allProducts?.map((product) => {
                        return (
                            <TableRow key={product?._id}>
                                <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                    <CardMedia
                                        component="img"
                                        src={product?.image.url}
                                        sx={{
                                            width: { xs: "40px", sm: "50px", md: "60px" }, height: { xs: "40px", sm: "50px", md: "60px" }
                                            , objectFit: "cover", margin: "auto", border: "1px solid"
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ width: "32%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                    {product?.name}
                                </TableCell>
                                <TableCell align="center" sx={{ width: "32%", fontSize: { xs: "12px", sm: "14px", md: "18px" }, color: "red", fontWeight: "bold" }}>
                                    {countProductLikes(product?._id)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
