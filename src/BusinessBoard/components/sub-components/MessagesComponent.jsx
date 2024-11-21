import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Collapse, IconButton, Button, TextField, TableContainer, Paper } from '@mui/material';
import React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

export default function MessagesComponent({ allCustomersDetails = [], toTitleCase, handleDeleteMessage, handleCompleteMessage, handleResponseMessage, handleOnChange, expanded, toggleExpandRow }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black', fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>Customer's Id</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black', fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>Customer's Name</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black', fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>Customer's Phone</TableCell>
                        <TableCell align='center' sx={{ fontWeight: "bold", color: 'black', fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>Customer's Email</TableCell>
                        <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allCustomersDetails.map((customerDetails) =>
                        customerDetails?.messages?.map((message, index) => {
                            const uniqueId = `${customerDetails._id}-${index}`;
                            return (
                                <React.Fragment key={uniqueId}>
                                    <TableRow sx={{ cursor: 'pointer' }} onClick={() => toggleExpandRow(uniqueId)}>
                                        <TableCell align='center' sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>{customerDetails?._id}</TableCell>
                                        <TableCell align='center' sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                            {toTitleCase(`${customerDetails?.name.first} ${customerDetails?.name.middle ? customerDetails.name.middle + ' ' : ''}${customerDetails?.name.last}`)}
                                        </TableCell>
                                        <TableCell align='center' sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>{customerDetails?.phone}</TableCell>
                                        <TableCell align='center' sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>{customerDetails?.email}</TableCell>
                                        <TableCell align="center" sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                            <IconButton size="small">
                                                {expanded === uniqueId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                            <Collapse in={expanded === uniqueId} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2, display: 'flex', flexDirection: "column", gap: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "14px", sm: "16px", md: "24px" } }}>
                                                        Customer's Message
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ textAlign: "center", fontSize: { xs: "12px", sm: "14px", md: "20px" } }}>
                                                        {message?.message}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <TextField
                                                            onChange={handleOnChange}
                                                            sx={{ width: "40%" }}
                                                            placeholder="Response"
                                                            multiline
                                                            minRows={1}
                                                            inputProps={{ style: { textAlign: 'center' } }}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <IconButton onClick={() => handleResponseMessage(message?.message, customerDetails?._id, customerDetails?.email)} sx={{ width: { xs: "30px", sm: "30px", md: "50px" }, height: "50px" }}>
                                                            <SendIcon sx={{ color: "black", fontSize: { xs: "14px", sm: "16px", md: "28px" } }} />
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, paddingTop: 2 }}>
                                                        <Button onClick={() => handleDeleteMessage(message?.message, customerDetails?._id, customerDetails?.email)} variant="contained" color="error" sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px" } }}>Delete</Button>
                                                        <Button onClick={() => handleCompleteMessage(message?.message, customerDetails?._id, customerDetails?.email)} variant="contained" color="success" sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px" } }}>Completed</Button>
                                                    </Box>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
