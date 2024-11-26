import { Box, Button } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function FilterStatistics({ filter, setFilter }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", gap: 1 }}>
            <Button onClick={() => setFilter("likes")} sx={{ display: "flex", gap: 1, opacity: filter === "likes" ? "1" : "0.5" }} variant='contained'>LIKES<FavoriteIcon /></Button>
            <Button onClick={() => setFilter("orders")} sx={{ display: "flex", gap: 1, opacity: filter === "orders" ? "1" : "0.5" }} variant='contained'>ORDERS <AttachMoneyIcon /></Button>
        </Box >
    )
}
