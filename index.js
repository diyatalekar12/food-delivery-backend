const express = require('express');
const cron = require('node-cron');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage
let menuItems = [];
let orders = [];

// Add a new menu item
app.post('/menu', (req, res) => {
    const { name, price, category } = req.body;

    // Validate input
    const validCategories = ['Main Course', 'Snacks', 'Desserts'];
    if (!name || price <= 0 || !validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid menu item details' });
    }

    const newItem = { id: menuItems.length + 1, name, price, category };
    menuItems.push(newItem);
    res.json({ message: 'Menu item added successfully', newItem });
});

// Get all menu items
app.get('/menu', (req, res) => {
    res.json(menuItems);
});

// Place an order
app.post('/orders', (req, res) => {
    const { items } = req.body;

    // Validate item IDs
    const invalidItems = items.filter(itemId => !menuItems.some(item => item.id === itemId));
    if (invalidItems.length > 0) {
        return res.status(400).json({ error: 'Invalid item ID(s)' });
    }

    const newOrder = {
        id: orders.length + 1,
        items: menuItems.filter(item => items.includes(item.id)),
        status: 'Preparing',
        timestamp: new Date()
    };

    orders.push(newOrder);
    res.json({ orderId: newOrder.id, message: 'Order placed successfully' });
});

// Get order by ID
app.get('/orders/:id', (req, res) => {
    const order = orders.find(order => order.id == req.params.id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});
// Update order statuses periodically
cron.schedule('*/30 * * * * *', () => { // Runs every 30 seconds
    const statusSequence = ['Preparing', 'Out for Delivery', 'Delivered'];

    orders.forEach(order => {
        const currentIndex = statusSequence.indexOf(order.status);
        if (currentIndex < statusSequence.length - 1) {
            order.status = statusSequence[currentIndex + 1];
        }
    });

    console.log('Order statuses updated:', orders);
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
