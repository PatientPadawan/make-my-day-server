const Sequelize = require('sequelize');
const finale = require('finale-rest');
const app = require('./app');
const authentication = require('./middleware/okta-auth');
const sanitizer = require('./middleware/html-sanitizer');
const {
  NODE_ENV, DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD,
} = require('./config');
const blogpostModel = require('../src/models/blogposts');

let sequelize;

// in production environment DATABASE_URL is an env-var provided by host service
// in local environment it must be set to an env-var equal to the database name

if (NODE_ENV == 'production') {
  const match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  sequelize = new Sequelize(DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, { dialect: 'postgres', logging: false });
}

// define blogpost model
const blogposts = blogpostModel(sequelize, Sequelize);

finale.initialize({
  app,
  sequelize,
});

// build REST resource
const blogpostsResource = finale.resource({
  model: blogposts,
  endpoints: ['/api/blogpost', '/api/blogpost/:id'],
});

// hooks authentication middleware to a promise object
const authenticationPromise = (req, res, context) => new Promise((resolve, reject) => {
  authentication(req, res, (arg) => {
    if (arg) {
      res.status(401).send({ message: 'Unauthorized' });
      resolve(context.stop);
    } else {
      resolve(context.continue);
    }
  });
});

// attach auth middleware for blogpost POST/DELETE/PUT endpoints
blogpostsResource.create.auth((req, res, context) => authenticationPromise(req, res, context));
blogpostsResource.delete.auth((req, res, context) => authenticationPromise(req, res, context));
blogpostsResource.update.auth((req, res, context) => authenticationPromise(req, res, context));

// sanitization of html from client prior to storage in DB
blogpostsResource.create.write.before((req, res, context) => sanitizer(req, res, context));

module.exports = sequelize;
