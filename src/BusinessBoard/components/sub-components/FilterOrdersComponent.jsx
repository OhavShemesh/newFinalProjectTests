import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function FilterOrdersComponent({ handleFilterClick, activeFilter }) {

    return (
        <Box sx={{ pt: 1, pb: 2, display: 'flex', alignItems: "center", gap: 1, justifyContent: "center", width: "40%", margin: "auto" }}>
            <Typography sx={{ marginRight: 1 }}>Filter By:</Typography>
            <Button
                variant='contained'
                sx={{
                    opacity: activeFilter === "All" ? 1 : 0.6,
                    fontWeight: activeFilter === "All" ? "bold" : "normal",
                    backgroundColor: activeFilter === "All" ? "black" : "gray",
                    color: activeFilter === "All" ? "white" : "white",
                    fontSize: { xs: "8px", sm: "12px", md: "14px" }
                }}
                onClick={() => handleFilterClick("All")}
            >
                All
            </Button>
            <Button
                variant='contained'
                sx={{
                    opacity: activeFilter === "Pending" ? 1 : 0.6,
                    fontWeight: activeFilter === "Pending" ? "bold" : "normal",
                    fontSize: { xs: "8px", sm: "12px", md: "14px" }
                }}
                color='warning'
                onClick={() => handleFilterClick("Pending")}
            >
                Pending
            </Button>
            <Button
                variant='contained'
                sx={{
                    opacity: activeFilter === "In Progress" ? 1 : 0.6,
                    fontWeight: activeFilter === "In Progress" ? "bold" : "normal",
                    fontSize: { xs: "8px", sm: "12px", md: "14px" },
                    whiteSpace: "nowrap"
                }}
                color='info'
                onClick={() => handleFilterClick("In Progress")}
            >
                In Progress
            </Button>
            <Button
                variant='contained'
                sx={{
                    opacity: activeFilter === "Completed" ? 1 : 0.6,
                    fontWeight: activeFilter === "Completed" ? "bold" : "normal",
                    fontSize: { xs: "8px", sm: "12px", md: "14px" }

                }}
                color='success'
                onClick={() => handleFilterClick("Completed")}
            >
                Completed
            </Button>
        </Box>
    );
}
