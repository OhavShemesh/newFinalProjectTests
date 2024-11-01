import { BrowserRouter } from "react-router-dom"
import Router from "./router/Router"
import Layout from "./layout/Layout"
import CustomerProvider from "./customers/provider/UserProvider"
import SnackbarProvider from "./providers/SnackBarProvider"

function App() {

  return (
    <BrowserRouter>
      <CustomerProvider>
        <SnackbarProvider>
          <Layout>
            <Router />
          </Layout>
        </SnackbarProvider>
      </CustomerProvider>
    </BrowserRouter>
  )
}

export default App
