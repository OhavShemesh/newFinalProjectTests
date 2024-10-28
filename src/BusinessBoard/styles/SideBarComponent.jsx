import React from 'react';
import { Box } from '@mui/material';
import '../styles/SidebarMenu.css';

export default function SideBarComponent({ setSelectedComponent, selectedComponent }) {

    return (
        <Box>
            <div className="sidebar">
                <h2 className="sidebar-title">Business Board</h2>
                <ul className="menu-items">
                    <li>
                        <button
                            onClick={() => setSelectedComponent('Add')}
                            className={selectedComponent === 'Add' ? 'active' : ''}
                        >
                            Add
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('Update')}
                            className={selectedComponent === 'Update' ? 'active' : ''}
                        >
                            Update
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('Delete')}
                            className={selectedComponent === 'Delete' ? 'active' : ''}
                        >
                            Delete
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('Orders')}
                            className={selectedComponent === 'Orders' ? 'active' : ''}
                        >
                            Orders
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedComponent('Stock')}
                            className={selectedComponent === 'Stock' ? 'active' : ''}
                        >
                            Stock
                        </button>
                    </li>
                </ul>
            </div>
        </Box>
    );
}
