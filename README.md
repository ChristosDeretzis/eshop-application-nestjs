# Eshop API Using Nest.JS

This API was built in order to learn Nest.JS and Typescript. It is a simple eshop api that handles products and orders and its CRUD operations. 

## How to run
1. Clone this repo locally
2. Setup your environment variables:

    ```js
    MONGO_URI=<URL_OF_MONGO_DATABASE>
    JWT_SECRET=<A_SECRET_PHRASE>
    ENCRYPT_JWT_SECRET=<A_SECRET_PHRASE>
    JWT_EXPIRATION=<A_TIME_YOU_WANT>
    ```
3. Run `npm install` and then `npm run start`
    
## Tech Stack of API
1. Nest.JS (Typescript)
2. MongoDB and Mongoose (Database)
3. Swagger (API Documentation)

## API Endoints
- (POST) `/user`: Add a new user
- (POST) `/user/verify-email`: Verify user's email
- (POST) `/user/login`: Login user
- (POST) `/user/refresh-access-token`: Refresh an expired access token
- (POST) `/product`: Create a new product
- (GET)  `/product`: Get all Products
- (GET)  `/product/{id}`: Get a specific Product
- (PATCH)  `/product/{id}`: Update a specific Product
- (DELETE)  `/product/{id}`: Delete a specific Product
- (POST)  `/order`: Create a new order
- (PATCH)  `/order/{id}`: Update a specific order
- (DELETE)  `/order/{id}`: Delete a specific order
- (GET)  `/order`: Get All orders
- (GET)  `/order/{id}`: Get a specific order
- (GET)  `/order/get/userorders/{id}`: Get the orders of a user
- (GET)  `/order/get/totalSales`: Get total sales from all orders
- (GET)  `/order/get/count`: Get total number of orders

