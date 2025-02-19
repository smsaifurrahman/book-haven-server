# Book Shop Application - Backend

This repository contains the backend API for a Book Shop application built using Node.js, Express, and MongoDB. It provides RESTful endpoints for managing users, products, and orders, along with secure authentication and payment integration.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)


## Project Overview

This project provides the backend API for a Book Shop application. It handles data persistence, user authentication, business logic, and communication with the frontend.

## Features

- **User Authentication:** Secure registration, login, and JWT token-based authentication. Role-based access control (user/admin).
- **Product Management:** CRUD operations for managing books.
- **Order Management:** CRUD operations for managing orders, including stock level updates.
- **Payment Integration:** Integration with SurjoPay (or your chosen payment gateway) for processing payments.
- **Error Handling:** Robust error handling and informative error messages.
- **Pagination:** Implemented for product listings and order retrieval.
- **Data Validation:** Input validation to ensure data integrity.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for data persistence.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
- **JSON Web Token (JWT):** For secure authentication.
- **Bcrypt:** For password hashing.
- **Payment Gateway Library:**  (e.g., the SurjoPay Node.js library)
- **Other Libraries:** Any other relevant libraries used (e.g., validation libraries, logging libraries).

## Installation

1. Clone the repository: `git clone https://github.com/your-username/book-shop-backend.git`
2. Navigate to the project directory: `cd book-shop-backend`
3. Install dependencies: `npm install` or `yarn install`
4. Configure environment variables: Create a `.env` file in the root directory and add the necessary environment variables (e.g., database connection string, JWT secret key, SurjoPay credentials). Example:
