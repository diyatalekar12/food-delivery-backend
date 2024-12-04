# food-delivery-backend

## Project Description
The Food Delivery Backend is a server-side application that provides REST APIs for managing restaurant menus, handling customer orders, and automating order status updates. It is designed to simulate the backend of a food delivery service.

## Features

- Add menu items with details like name, price, and category.
- Retrieve the full menu list.
- Place an order by selecting multiple menu items.
- Fetch details of a specific order, including its current status.
- Automated order status updates from "Preparing" → "Out for Delivery" → "Delivered" using a scheduled task.

## Technologies Used

- **Node.js**: Backend framework for building the server.
- **Express.js**: For handling HTTP routes and requests.
- **node-cron**: For scheduling automated order status updates.

## Prerequisites

- Node.js installed (v14 or later)
- A REST API testing tool (e.g., Postman or cURL)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd food-delivery-backend

##Install the dependencies
npm install

##Start the server
node index.js

##The server will run at
http://localhost:3000


---

### **7. API Endpoints**
Document the available API endpoints in detail.

```markdown
## API Endpoints

### 1. Add Menu Item
- **Endpoint**: `POST /menu`
- **Description**: Adds a new item to the menu.
- **Request Body**:
  ```json
  {
      "name": "Pizza",
      "price": 250,
      "category": "Main Course"
  }

##Your response will be
{
    "message": "Menu item added successfully",
    "newItem": { "id": 1, "name": "Pizza", "price": 250, "category": "Main Course" }
}


---

### **8. Project Design**
(Optional but useful for extra points) Add a brief about the design or architecture of the project.

```markdown
## Project Design

- **Menu Management**: In-memory storage for menu items allows CRUD operations on menu items.
- **Order Management**: Orders are stored in memory, ensuring valid menu items are selected for each order.
- **Order Status Automation**: `node-cron` is used to simulate periodic updates to order statuses.
