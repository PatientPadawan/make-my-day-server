# Make My Day Events Blog API

This project was created for Make My Day Events LLC. It features OAuth 2.0 security for protected endpoints and 

uses Sequelize as an ORM tool to manage a PostgreSQL database. In it's current iteration the API's core responsiblity is 

blogpost management. It stores the content of the blogposts as plain html strings, because these strings are recieved from 

the client they are sanitized prior to storage in the database. The server also integrates with Google APIs to send emails 

to an administrator from contact form submissions allowing the company to engage with potential customers. The testing suite in this project 

is my first foray into mocking and stubbing dependencies.

## Technologies

* Node.js
* Express
* PostgreSQL
* Sequelize
* Chai
* Mocha
* Supertest