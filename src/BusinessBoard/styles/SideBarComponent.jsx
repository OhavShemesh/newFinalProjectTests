import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import '../styles/SidebarMenu.css';

export default function SideBarComponent({ setSelectedComponent, selectedComponent }) {

    return (
        <Box sx={{ margin: "0", padding: "0", position: "fixed" }}>
            <Box sx={{
                position: 'fixed',
                top: '70px',
                height: 'calc(100vh - 140px)',
                width: '100px',
                backgroundColor: 'white',
                filter: "brightness(0.9)",
                color: '#333',
                borderRight: '1px solid #ccc',
                transition: 'width 0.3s ease',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >
                <Typography sx={{ textAlign: "center", padding: "10px", marginBottom: "15px", color: "black" }}>Business Board</Typography>
                <List sx={{ listStyleType: "none", padding: "0", margin: "0" }}>
                    <ListItem>
                        <Button
                            onClick={() => setSelectedComponent('Add')}
                            sx={{
                                backgroundColor: selectedComponent === 'Add' ? '#444' : '#888',
                                color: selectedComponent === 'Stock' ? '#FFFFFF' : '#FFFFFF',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: selectedComponent === 'Add' ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            Add
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={() => setSelectedComponent('Update')}
                            sx={{
                                backgroundColor: selectedComponent === 'Update' ? '#444' : '#888',
                                color: selectedComponent === 'Stock' ? '#FFFFFF' : '#FFFFFF',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: selectedComponent === 'Update' ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            Update
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={() => setSelectedComponent('Delete')}
                            sx={{
                                backgroundColor: selectedComponent === 'Delete' ? '#444' : '#888',
                                color: selectedComponent === 'Stock' ? '#FFFFFF' : '#FFFFFF',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: selectedComponent === 'Delete' ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={() => setSelectedComponent('Orders')}
                            sx={{
                                backgroundColor: selectedComponent === 'Orders' ? '#444' : '#888',
                                color: selectedComponent === 'Stock' ? '#FFFFFF' : '#FFFFFF',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: selectedComponent === 'Orders' ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            Orders
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={() => setSelectedComponent('Stock')}
                            sx={{
                                backgroundColor: selectedComponent === 'Stock' ? '#444' : '#888',
                                color: selectedComponent === 'Stock' ? '#FFFFFF' : '#FFFFFF',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: selectedComponent === 'Stock' ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            Stock
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={() => setSelectedComponent('Messages')}
                            sx={{
                                backgroundColor: selectedComponent === 'Messages' ? '#444' : '#888',
                                color: selectedComponent === 'Messages' ? '#FFFFFF' : '#FFFFFF',
                                border: 'none',
                                fontSize: '16px',
                                padding: "5px",
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: selectedComponent === 'Messages' ? 'grey' : 'rgba(0, 0, 0, 0.4)',
                                },
                            }}
                        >
                            Messages
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
