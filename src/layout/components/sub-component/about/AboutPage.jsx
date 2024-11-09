import { Box, Typography, Container } from '@mui/material';
import React from 'react';

export default function AboutPage() {
    return (
        <Box sx={{ padding: 4, minHeight: "100vh" }}>
            {/* About Us Section */}
            <Container sx={{ paddingBottom: 5, display: "flex", flexDirection: 'column', gap: 3 }}>
                <Typography sx={{ textAlign: 'center', color: "black", paddingBottom: 3 }} variant="h3">
                    ABOUT US
                </Typography>
                <Typography color='black' variant="body1">
                    Welcome to our website. We are dedicated to providing exceptional service and ensuring that every interaction with us is efficient and rewarding.
                    Our team strives to deliver the highest quality, continuously working to improve your experience with our offerings.
                </Typography>
                <Typography color='black' variant="body1">
                    Our company was established with a clear vision: to offer unparalleled value to our clients through a wide range of specialized services tailored to meet your specific needs.
                </Typography>
                <Typography color='black' variant="body1">
                    Thank you for choosing us as your trusted partner. We look forward to serving you and exceeding your expectations.
                </Typography>
            </Container>

            {/* Divider */}
            <Container sx={{ borderBottom: "1px dotted", marginBottom: 5 }}></Container>

            {/* About Me Section */}
            <Container sx={{ paddingBottom: 5, display: "flex", flexDirection: 'column', gap: 3 }}>
                <Typography sx={{ textAlign: 'center', color: "black", paddingY: 3 }} variant="h3">
                    ABOUT ME
                </Typography>
                <Typography color='black' variant="body1">
                    This website represents my final project, which integrates a full-stack solution. The front-end is developed using React, while the back-end is powered by an Express-based server and a MongoDB database.
                </Typography>
                <Typography color='black' variant="body1">
                    The platform includes a comprehensive registration and login system. Users can browse a wide selection of products, view detailed product information, add items to their cart, and complete their purchase. Additionally, there is a search feature and category filter that helps customers easily find products. Each product's availability is clearly displayed, showing the number of items in stock, as well as indicating when an item is out of stock.
                </Typography>
                <Typography color='black' variant="body1">
                    On the cart page, customers have the option to remove items from their cart, making it easier to manage their selections before completing the purchase.
                </Typography>
                <Typography color='black' variant="body1">
                    Customers can also send messages directly to management via the contact page, eliminating the need for external communication methods such as email or WhatsApp.
                </Typography>
                <Typography color='black' variant="body1">
                    In the "Manage Orders" section, customers can view their past orders, including order status, total price, and the list of products in each order.
                </Typography>
                <Typography color='black' variant="body1">
                    For business customers, the site offers an exclusive business board where managers can add, update, and delete products. Additionally, managers have the ability to change the status of orders, offering enhanced control and flexibility in managing customer orders.
                </Typography>
                <Typography color='black' variant="body1">
                    Furthermore, the site is designed to support both light and dark modes to cater to the user's preference and enhance the overall user experience.
                </Typography>
                <Typography color='black' variant="body1">
                    Thank you once again for choosing us. We are committed to delivering excellent service and look forward to working with you.
                </Typography>
            </Container>
        </Box>
    );
}
