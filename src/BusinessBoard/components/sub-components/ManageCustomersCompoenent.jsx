import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function ManageCustomersCompoenent({ allCustomers = [], toTitleCase, handleChangeStatus }) {
    return (
        <TableContainer>
            <Table sx={{ width: "80%", margin: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: "23%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold" }}>CUSTOMER ID</TableCell>
                        <TableCell align="center" sx={{
                            width: "23%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold", whiteSpace: "nowrap"
                        }}>CUSTOMER'S FULL NAME</TableCell>
                        <TableCell align="center" sx={{ width: "23%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold" }}>STATUS</TableCell>
                        <TableCell align="center" sx={{ width: "23%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, fontWeight: "bold" }}>Change Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allCustomers.map((customer) => (
                        <TableRow key={customer._id}>
                            <TableCell align="center" sx={{
                                fontSize: { xs: "10px", sm: "12px", md: "16px" },
                                width: "23%"
                            }}>{customer?._id}</TableCell>
                            <TableCell align="center" sx={{
                                fontSize: { xs: "10px", sm: "12px", md: "16px" },
                                width: "23%"
                            }}>{toTitleCase(`${customer?.name.first} ${customer?.name.last}`)}</TableCell>
                            <TableCell align="center" sx={{
                                color: customer?.isBusiness ? 'green' : 'orange',
                                fontSize: { xs: "10px", sm: "12px", md: "16px" },
                                width: "23%"
                            }}>
                                {customer?.isBusiness ? "Business" : "Regular"}
                            </TableCell>
                            <TableCell align="center" sx={{
                                width: "23%"
                            }}>
                                <Button
                                    onClick={() => handleChangeStatus(customer?._id)}
                                    variant='contained'
                                    sx={{
                                        fontSize: { xs: "12px", sm: "12px", md: "16px" },
                                        backgroundColor: customer?.isBusiness ? 'red' : 'green',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: customer?.isBusiness ? 'darkred' : 'darkgreen',
                                            color: '#ffffff',
                                        },
                                        padding: { xs: 0, sm: 0, md: 0.5 }
                                    }}
                                >
                                    {customer?.isBusiness ? "Demote" : "Promote"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
