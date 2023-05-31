# Patisserie-web-app

This is a e-commerce web app created by Node.js, Express.js, MongoDB, TypeScript and React.js.

* Website: https://patisserie-web-app2.onrender.com/
* API Docs: https://patisserie-api-doc.onrender.com/

## Testing Account

**Admin:**

* Email: admin@test.com
* Password: secret

**User:**

* Email: test@test.com
* Password: secret

## Features

### Backend
* RESTful API design.
* Using JWT for authentication, storing it in cookies with HttpOnly flag for guarding XSS attacks.
* Create custom error class and error-handler middleware for error handling.
* Using Joi schema to validate the body of POST/PATCH requests.
* Using Mongoose pre hook to hash user password before storing into database.
* Calculate order amount and communicate with Stripe server on backend for safety concern.
* Using docgen to generate API docs.

### Frontend
* Using Context API and Reducer hooks for state management.
* Using React Router for routing.
* Using styled-components to write CSS in TSX files.
* Search, filter, and sort functionality in products page.
* Check order, update user info in user page.
* CRUD Products in products/single product page with admin account.

## Checkout

Using [Stripe](https://stripe.com/) api for checkout.

User can enter test card number 4242 4242 4242 4242 with any CVC and future date to checkout.

![checkout-success](https://github.com/lalabearchu/Patisserie-web-app/assets/106926108/195df880-1b3c-465e-9464-a313c461affc)


## Built with

* Node.js
* Express.js
* MongoDB
* TypeScript
* React.js
