import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Layout from "./layout/Layout";
import CustomerProvider from "./customers/provider/UserProvider";
import SnackbarProvider from "./providers/SnackBarProvider";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import { Box } from "@mui/material";
import { CartProvider } from "./providers/CartProvider";

function App() {

  return (
    <BrowserRouter>
      <CustomerProvider>
        <CustomThemeProvider>
          <SnackbarProvider>
            <CartProvider>
              <Layout>
                <Router />
              </Layout>
            </CartProvider>
          </SnackbarProvider>
        </CustomThemeProvider>
      </CustomerProvider>
    </BrowserRouter>
  );
}

export default App;
