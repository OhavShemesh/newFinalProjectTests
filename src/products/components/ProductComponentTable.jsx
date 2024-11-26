import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CardMedia, TextField } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

export default function ProductComponentTable({
    handleAddToCart,
    navigate,
    handleLikeProduct,
    customerDetails,
    handleShare,
    filteredProducts,
    quantities,
    handleQuantityChange,
    toTitleCase
}) {

    const cellWidth = "12.5%";  // Set a fixed width for all cells

    return (
        <TableContainer>
            <Table sx={{ width: "90%", margin: 'auto' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Image</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>InStock</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Like/Share</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Quantity</TableCell>
                        <TableCell sx={{ fontWeight: "bold", width: cellWidth }}>Add</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "5%" }}>Info</TableCell> {/* Reduced width */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts.map((product) => (
                        <TableRow
                            key={product._id}
                            sx={{
                                opacity: product?.inStock === 0 ? 0.7 : 1,
                                backgroundColor: product?.inStock === 0 ? "lightgrey" : "auto"
                            }}
                        >
                            <TableCell sx={{ width: cellWidth }}>
                                <CardMedia
                                    component="img"
                                    src={product?.image?.url}
                                    alt={product?.name || 'Product Image'}
                                    sx={{ height: "50px", width: "50px" }}
                                />
                            </TableCell>
                            <TableCell sx={{ width: cellWidth }}>{toTitleCase(product.name)}</TableCell>
                            <TableCell sx={{ width: cellWidth }}>{product.description}</TableCell>
                            <TableCell sx={{ width: cellWidth }}>${product.price}</TableCell>
                            <TableCell sx={{ width: cellWidth }}>
                                <span
                                    style={{
                                        color: product?.inStock ? "inherit" : "red",
                                        fontWeight: product?.inStock ? "normal" : "bold"
                                    }}
                                >
                                    {product?.inStock || "Out Of Stock"}
                                </span>
                            </TableCell>
                            <TableCell sx={{ width: cellWidth }}>{product.category}</TableCell>
                            <TableCell sx={{ width: cellWidth }}>
                                <IconButton onClick={() => handleLikeProduct(product?._id)} aria-label="add to favorites">
                                    <FavoriteIcon
                                        color={customerDetails?.likes?.includes(product._id) ? "error" : "auto"} />
                                </IconButton>
                                <IconButton onClick={() => handleShare(product.id)}>
                                    <ShareIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell sx={{ width: cellWidth }}>
                                <TextField
                                    type="number"
                                    sx={{ width: "70px" }}
                                    value={quantities[product._id] || 0}
                                    onChange={(e) => handleQuantityChange(e, product._id, product?.inStock)}
                                    disabled={product?.inStock === 0}
                                />
                            </TableCell>
                            <TableCell sx={{ width: cellWidth }}>
                                <IconButton
                                    onClick={() => handleAddToCart(product?._id, quantities[product._id])}
                                    disabled={product?.inStock === 0}
                                >
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" sx={{ width: "5%" }}>
                                <IconButton onClick={() => navigate("/product-info/" + product._id)}>
                                    <InfoIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
