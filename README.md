**Book Shop Backend**

**Overview**
This is a Book Shop management application built with Express, TypeScript, and MongoDB using Mongoose. The application allows the management of books and orders in a book store. It supports basic CRUD (Create, Read, Update, Delete) operations for both products (books) and orders. The system is designed to handle data validation, error handling, and integration with MongoDB for storing and retrieving product and order data.

**Live link**: https://book-shop-backend-eight.vercel.app

**Features**
Product (Book) Management: Allows adding, updating, fetching, and deleting books from the store.
Order Management: Customers can place orders for books by specifying product ID, quantity, and email.
Data Validation: Mongoose schema validation is used to ensure data integrity for both books and orders.
Inventory Management: Tracks the quantity of each book available and whether it's in stock.
Revenue dispaly: Provides total revenue from all orders combined


**Tech Stack**
Backend: Express, TypeScript
Database: MongoDB (via Mongoose)
Validation: Mongoose Schema Validation
API: RESTful API for CRUD operations
Setup Instructions
Prerequisites
Node.js: Make sure you have Node.js installed.
MongoDB: You will need an instance of MongoDB running locally or using a cloud service like MongoDB Atlas.


**Installation**
Clone the repository:

bash

git clone https://github.com/smsaifurrahman/book-shop-backend.git
Navigate into the project directory:

bash

cd book-shop-backend
Install the dependencies:

bash

npm install
Set up environment variables for MongoDB connection:

Create a .env file in the root of the project.
Add your MongoDB URI to the .env file:
arduino


MONGODB_URI=mongodb://your_mongo_uri_here
Start the application:

bash
Copy code
npm start
Available Endpoints
1. Create a Book
URL: /products (POST)
Body:
json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 15.99,
  "category": "Fiction",
  "description": "A novel set in the 1920s.",
  "quantity": 100,
  "inStock": true
}
Response:
json

{
  "status": true,
  "message": "Book created successfully",
  "data": { ...book details }
}
2. Get All Books
URL: /products (GET)
Query: searchTerm (optional)
Response:
json
Copy code
{
  "success": true,
  "message": "Books data retrieved Successfully",
  "data": [ ...list of books ]
}
3. Get a Single Book
URL: /products/:id (GET)
Response:
json

{
  "success": true,
  "message": "Book is retrieved Successfully",
  "data": { ...book details }
}
4. Update a Book
URL: /products/:id (PUT)
Body:
json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "category": "Fiction",
  "description": "Updated description.",
  "quantity": 80,
  "inStock": true
}
Response:
json
Copy code
{
  "success": true,
  "message": "Book is Updated Successfully",
  "data": { ...updated book details }
}
5. Delete a Book
URL: /products/:id (DELETE)
Response:
json

{
  "status": true,
  "message": "Book is deleted Successfully",
  "data": {}
}
6. Create an Order
URL: /orders (POST)
Body:
json

{
  "email": "customer@example.com",
  "product": "ObjectId_of_book",
  "quantity": 2,
  "totalPrice": 31.98
}
Response:
json

{
  "status": true,
  "message": "Order created successfully",
  "data": { ...order details }
}
Environment Variables
MONGODB_URI: The connection string to your MongoDB database.
Example Workflow
Create a product (book) by posting to /products.
Retrieve the list of books with a GET request to /products.
Place an order for a book by sending a POST request to /orders with the product ID and quantity.
