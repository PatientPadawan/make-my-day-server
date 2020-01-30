# Make My Day Events Blog API

This project was created for Make My Day Events LLC. It features OAuth 2.0 security for protected endpoints and 

uses Sequelize as an ORM tool to manage a PostgreSQL database. As HTML strings are provided by the client for this 

project a sanitization library is used before storing the string in the database. The API also integrates with Google 

APIs to send emails to an administrator from contact form submissions. The testing suite in this project is my

first foray into mocking and stubbing dependencies.

## Technologies

* Node.js
* Express
* PostgreSQL
* Sequelize
* Chai
* Mocha
* Supertest