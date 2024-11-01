import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './styles/Header.css';
import ROUTES from '../../router/routesModel';
import { removeToken } from '../../localStorageFunctions/useLocalStorage';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';

export default function Header({ cart, navigate }) {

  const { customer } = useCurrentCustomer()

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleUserMenu = (event) => {
    setAnchorElUser((prev) => (prev ? null : event.currentTarget));
  };

  const handleLogout = () => {
    removeToken()
    window.location.reload();
  };


  const settings = ['Profile', "Manage Orders", 'Business Board', 'Logout'];

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
      <AppBar className="appbar" position="static">
        <Toolbar className="toolbar">
          <Typography sx={{ cursor: "pointer" }} variant="h6" noWrap component="div" onClick={() => navigate(ROUTES.ROOT)}>
            MyStore
          </Typography>
          <div className="search">
            <div className="search-icon-wrapper">
              <SearchIcon />
            </div>
            <InputBase
              sx={{ color: 'white' }}
              placeholder="Search"
              className="styled-input-base"
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton onClick={() => {
              navigate(ROUTES.CART);
              window.location.reload();
            }} size="large" color="inherit">
              <Badge badgeContent={cart?.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {customer ? <IconButton onClick={handleUserMenu} size="large" color="inherit">
              <AccountCircle className="account-icon" />
            </IconButton> : <Box sx={{ display: "flex", gap: 1 }}>
              <Button onClick={() => { navigate(ROUTES.LOGIN) }} sx={{ backgroundColor: "black", border: "1px solid white" }} variant='contained'>Login</Button>
              <Button onClick={() => { navigate(ROUTES.REGISTER) }} sx={{ backgroundColor: "black", border: "1px solid white" }} variant='contained'>Register</Button>
            </Box>
            }
            <Menu
              sx={{ mt: '30px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === 'Logout') {
                      handleLogout();
                    } else if (setting === 'Business Board') {
                      navigate(ROUTES.BUSINESS_BOARD)
                    }
                  }}                >
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
