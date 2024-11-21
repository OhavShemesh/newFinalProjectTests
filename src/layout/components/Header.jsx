import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Button, CardMedia } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ROUTES from '../../router/routesModel';
import SearchBar from './sub-component/SearchBar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Header({ cart, navigate, customerDetails, toggleMode, mode, customer, anchorElUser, handleUserMenu, settings, handleLogout, isImageValid, setIsImageValid }) {

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 0, backgroundColor: "#000000" }}>
          <IconButton sx={{ cursor: "pointer" }} variant="h6" onClick={() => navigate(ROUTES.ROOT)}>
            <picture>
              <source media="(max-width: 800px)" srcSet="./MySmallStoreLogo.png" />
              <source media="(min-width: 800px)" srcSet="./MyStoreLogo.png" />
              <CardMedia
                component="img"
                src="./MyStoreLogo.png"
                alt=""
                sx={{ height: { xs: '30px', sm: '50px' } }}
              />
            </picture>
          </IconButton>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: { xs: 0, sm: 1, md: 3 } }}>
            <IconButton onClick={toggleMode}>
              {mode === "light" ? <DarkModeIcon sx={{ color: "#FFFFFF", fontSize: { xs: "18px", sm: "24px" } }} /> : <LightModeIcon sx={{ color: "#FFFFFF", fontSize: { xs: "18px", sm: "24px" } }} />}
            </IconButton>
            <IconButton onClick={() => navigate(ROUTES.CART)} sx={{ color: "#FFFFFF" }}>
              <Badge
                badgeContent={cart?.length}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: { xs: '0.5rem', sm: "0.7rem" },
                    minWidth: '15px',
                    width: { xs: "15px", sm: "20px" },
                    height: { xs: "15px", sm: "20px" },
                    padding: '0 4px',
                  },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />
              </Badge>
            </IconButton>
            {customer ? (
              <IconButton onClick={handleUserMenu} sx={{ color: "#FFFFFF" }}>
                {customerDetails?.image?.url && isImageValid ? (
                  <CardMedia
                    component="img"
                    src={customerDetails.image.url}
                    alt={customerDetails.image.alt || "User Image"}
                    sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 }, borderRadius: "50%" }}
                    onLoad={() => setIsImageValid(true)}
                    onError={() => setIsImageValid(false)}
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
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Button onClick={() => navigate(ROUTES.LOGIN)} sx={{
                  backgroundColor: "black",
                  border: "1px solid #FFFFFF",
                  fontSize: { xs: "0.5rem", sm: "0.7rem" },
                  width: { xs: "50px", sm: "auto" },
                  minWidth: "unset",
                  height: { xs: "70%", sm: "auto" }
                }}
                  variant="contained">Login</Button>
                <Button onClick={() => navigate(ROUTES.REGISTER)} sx={{
                  backgroundColor: "black",
                  border: "1px solid #FFFFFF",
                  fontSize: { xs: "0.5rem", sm: "0.7rem" },
                  width: { xs: "50px", sm: "auto" },
                  minWidth: "unset",
                  height: { xs: "70%", sm: "auto" }
                }} variant="contained">Register</Button>
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
