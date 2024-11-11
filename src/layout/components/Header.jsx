import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Button, CardMedia } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ROUTES from '../../router/routesModel';
import { removeToken } from '../../localStorageFunctions/useLocalStorage';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';
import SearchBar from './sub-component/SearchBar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCustomTheme } from '../../providers/CustomThemeProvider';

export default function Header({ cart, navigate, customerDetails }) {
  const { customer } = useCurrentCustomer();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { mode, toggleMode } = useCustomTheme();
  const [isImageValid, setIsImageValid] = useState(true); // New state to handle image validation

  const handleUserMenu = (event) => {
    setAnchorElUser((prev) => (prev ? null : event.currentTarget));
  };

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  const settings = ['Profile', "Manage Orders", 'Logout'];

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
      <AppBar position="static">
        <Toolbar className="toolbar" sx={{ gap: 0, backgroundColor: "#000000" }}>
          <IconButton sx={{ cursor: "pointer" }} variant="h6" onClick={() => navigate(ROUTES.ROOT)}>
            <CardMedia
              component='img'
              src='./MyStoreLogo.png'
              alt='MyStore'
              sx={{ height: { xs: "40px", sm: "50px" } }}
            />
          </IconButton>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton onClick={toggleMode}>
              {mode === "light" ? <DarkModeIcon sx={{ color: "#FFFFFF" }} /> : <LightModeIcon sx={{ color: "#FFFFFF" }} />}
            </IconButton>
            <IconButton onClick={() => navigate(ROUTES.CART)} size="large" sx={{ color: "#FFFFFF" }}>
              <Badge badgeContent={cart?.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {customer ? (
              <IconButton onClick={handleUserMenu} size="large" sx={{ color: "#FFFFFF" }}>
                {customerDetails?.image?.url && isImageValid ? (
                  <CardMedia
                    component="img"
                    src={customerDetails.image.url}
                    alt={customerDetails.image.alt || "User Image"}
                    sx={{ width: 32, height: 32, borderRadius: "50%" }}
                    onLoad={() => setIsImageValid(true)}
                    onError={() => setIsImageValid(false)} // Update state if image fails to load
                  />
                ) : (
                  <Box sx={{ position: "relative" }}>
                    <AccountCircle sx={{ fontSize: 32 }} />
                    <Badge
                      badgeContent="Invalid Image"
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "8px",
                          top: 0,
                          right: 0,
                          transform: "scale(1.2)",
                          zIndex: 1,
                        },
                      }}
                    />
                  </Box>
                )}
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button onClick={() => navigate(ROUTES.LOGIN)} sx={{ backgroundColor: "black", border: "1px solid #FFFFFF" }} variant="contained">Login</Button>
                <Button onClick={() => navigate(ROUTES.REGISTER)} sx={{ backgroundColor: "black", border: "1px solid #FFFFFF" }} variant="contained">Register</Button>
              </Box>
            )}
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
                    } else if (setting === 'Manage Orders') {
                      navigate(ROUTES.MANAGE_MY_ORDERS);
                      handleUserMenu();
                    } else if (setting === 'Profile') {
                      navigate(ROUTES.PROFILE_PAGE);
                      handleUserMenu();
                    }
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
