# Patisserie-web-app

This is a e-commerce web app created by Node.js, Express.js, MongoDB, TypeScript and React.js.

* Website: https://patisserie-web-app2.onrender.com/
* API Doc: https://patisserie-api-doc.onrender.com/

## Testing Account

**Admin:**

* Email: admin@test.com
* Password: secret

**User:**

* Email: test@test.com
* Password: secret

## Features

* RESTful API design.
* Using JWT for authentication, storing it in cookies with HttpOnly flag for guarding XSS attacks.
* Create custom error class and error-handler middleware for error handling.
* Using Joi schema to validate the body of POST/PATCH requests.
* Using Mongoose pre hook to hash user password before storing it.

## Checkout

Using [Stripe](https://stripe.com/) api for checkout.

User can enter test card number 4242 4242 4242 4242 with any CVC and future date to checkout.

![checkout](https://github.com/lalabearchu/Patisserie-web-app/assets/106926108/f1fbbc65-2c1a-42aa-823d-e8de44aa559b)

## Built with

* Node.js
* Express.js
* MongoDB
* TypeScript
* React.js
