import React, { useState } from 'react';
import { Box } from '@mui/material';
import SideBarComponent from '../styles/SideBarComponent';
import AddProductManager from './sub-components/managers/AddProductManager';
import DeleteProductsManager from './sub-components/managers/DeleteProductsManager';
import UpdateProductManager from './sub-components/managers/UpdateProductManager';
import OrdersManager from './sub-components/managers/OrdersManager';
import UpdateStockManager from './sub-components/managers/UpdateStockManager';
import MessagesManager from './sub-components/managers/MessagesManager';

export default function BusinessBoardComponent() {
  const [selectedComponent, setSelectedComponent] = useState('Add');

  const renderContent = () => {
    switch (selectedComponent) {
      case 'Add':
        return <AddProductManager />
      case 'Orders':
        return <OrdersManager />
      case 'Stock':
        return <UpdateStockManager />;
      case 'Delete':
        return <DeleteProductsManager />
      case 'Update':
        return <UpdateProductManager />;
      case 'Messages':
        return <MessagesManager />;
      default:
        return <AddProductManager />;
    }
  };

  return (
    <Box>
      <SideBarComponent setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
      <Box sx={{ marginLeft: { xs: '0', sm: "0", md: "100px" }, paddingTop: { xs: "80px", sm: "80px", md: "0" } }}>
        {renderContent()}
      </Box>
    </Box>
  );
}
