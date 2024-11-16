import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function FilterOrdersComponent({ setFilter }) {
    const [activeFilter, setActiveFilter] = useState("All");

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        setFilter(filter)
    };

    return (
        <Box sx={{ pt: 1, pb: 2, display: 'flex', alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Button
                variant='contained'
                sx={{
                    opacity: activeFilter === "All" ? 1 : 0.6,
                    fontWeight: activeFilter === "All" ? "bold" : "normal",
                    backgroundColor: activeFilter === "All" ? "black" : "gray",
                    color: activeFilter === "All" ? "white" : "black",
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
                }}
                color='success'
                onClick={() => handleFilterClick("Completed")}
            >
                Completed
            </Button>
        </Box>
    );
}
