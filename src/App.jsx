import { BrowserRouter } from "react-router-dom"
import Router from "./router/Router"
import Layout from "./layout/Layout"
import CustomerProvider from "./customers/provider/UserProvider"

function App() {

  return (
    <BrowserRouter>
      <CustomerProvider>
        <Layout>
          <Router />
        </Layout>
      </CustomerProvider>
    </BrowserRouter>
  )
}

export default App
