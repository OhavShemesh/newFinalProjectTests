import React, { useEffect, useState } from 'react';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';
import useCustomers from '../../customers/hooks/useCustomers';
import { Box, Button, IconButton, Typography } from '@mui/material';
import useProducts from '../hooks/useProducts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ROUTES from '../../router/routesModel';

export default function CartCheckCustomer() {
  const { customer } = useCurrentCustomer();
  const { getCustomerById } = useCustomers()
  const [myCustomer, setMyCustomer] = useState(customer)
  const { toTitleCase, navigate } = useProducts()
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (customer) {
      const fetchCustomer = async () => {
        try {
          let thisCustomer = await getCustomerById(customer._id)
          setMyCustomer(thisCustomer)


        } catch (err) {
          console.log(err);

        }

      }
      fetchCustomer()

    }

  }, [customer])

  if (!customer) {
    return (
      <Box
        sx={{
          backgroundColor: "black",
          width: "25%",
          maxHeight: isHidden ? "0%" : "100%",
          margin: "-6px auto",
          borderRadius: "0 0 20px 20px",
          position: "relative",
          transform: isHidden ? "translateY(-100%)" : "translateY(0%)",
          transition: "transform 0.3s ease"
        }}
      >        <Typography sx={{ textAlign: "center" }} color='white'>You cannot place an order if you are not a customer</Typography>
        <Box sx={{ display: "flex", justifyContent: 'center', py: 2, gap: 5 }}>
          <Button onClick={() => { navigate(ROUTES.LOGIN) }} sx={{ backgroundColor: "black", border: "1px solid white" }} variant='contained'>Login</Button>
          <Button onClick={() => { navigate(ROUTES.REGISTER) }} sx={{ backgroundColor: "black", border: "1px solid white" }} variant='contained'>Register</Button>
        </Box>
        <IconButton onClick={() => { setIsHidden((prev) => !prev) }} sx={{ position: "absolute", top: "90%", left: "42.5%" }}>
          {isHidden ? <KeyboardArrowDownIcon sx={{ color: 'white', backgroundColor: "black" }} /> : <KeyboardArrowUpIcon sx={{ color: 'white', backgroundColor: "black" }} />}
        </IconButton>
      </Box >
    )
  }
}
