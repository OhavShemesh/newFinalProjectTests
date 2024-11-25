import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

export default function SideBarComponent({ setSelectedComponent, selectedComponent }) {

    return (
        <Box sx={{
            margin: "0", padding: "0", position: "fixed", zIndex: 50000
        }}>
            <Box sx={{
                position: 'fixed',
                top: { xs: "50px", sm: "70px", md: "70px" },
                height: { xs: 'auto', sm: 'auto', md: 'calc(100vh - 140px)' },
                width: { xs: '100%', sm: '100%', md: '100px' },
                backgroundColor: 'white',
                filter: "brightness(0.9)",
                color: '#333',
                borderRight: { md: '1px solid #ccc' },
                borderBottom: { xs: '1px solid #ccc', sm: '1px solid #ccc', md: 'none' },
                transition: 'width 0.3s ease',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: "1%"
            }} >
                <Typography sx={{ textAlign: "center", padding: "10px", marginBottom: { xs: "0", sm: "0", md: "15px" }, color: "black", fontSize: { xs: "1rem", sm: "1rem", md: "1rem" } }}>
                    Business Board
                </Typography>
                <List sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'row', md: 'column' },
                    listStyleType: "none",
                    padding: "0",
                    margin: "0",
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: "center",
                    gap: { xs: 0.5, sm: 0.5, md: 2 },
                    flexWrap: "wrap"
                }}>
                    {['Add', 'Update', 'Delete', 'Orders', 'Stock', 'Messages', `Customers`, `Statics`].map((item) => (
                        <ListItem key={item} sx={{ padding: "0", width: { xs: 'auto', sm: 'auto', md: '80%' } }}>
                            <Button
                                onClick={() => setSelectedComponent(item)}
                                sx={{
                                    backgroundColor: selectedComponent === item ? '#444' : '#888',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    fontSize: {
                                        xs: "8px",
                                        sm: "10px",
                                        md: item === "Customers" ? "12px" : "14px"
                                    },
                                    width: { xs: '50px', sm: '80px', md: '100%' },
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: selectedComponent === item ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                    },
                                }}
                            >
                                {item}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box >
    );
}
