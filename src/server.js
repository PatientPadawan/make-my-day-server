const app = require('./app')
const Sequelize = require('sequelize')
const finale = require('finale-rest')
const authentication = require('./middleware/okta-auth')
const sanitizer = require('./middleware/html-sanitizer')
const { NODE_ENV, PORT, DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD } = require('./config')



// Configure DB and add blogpost model
let database = null;
if (NODE_ENV === 'production') {
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    database = new Sequelize(match[5], match[1], match[2], { 
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true,
        dialectOptions: {
            ssl: true
        },
    });
} else {
    database = new Sequelize(DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, { dialect: 'postgres' });
}

const blogposts = database.define('blogposts', {
    content: Sequelize.TEXT,
    published: Sequelize.BOOLEAN,
})

finale.initialize({
    app: app,
    sequelize: database
});

// build REST resource
const blogpostsResource = finale.resource({
    model: blogposts,
    endpoints: ['/api/blogpost', '/api/blogpost/:id']
});

// hooks authentication middleware to a promise object
const authenticationPromise = (req, res, context) => {
    return new Promise((resolve, reject) => {
        authentication(req, res, function (arg) {
            if (arg) {
                res.status(401).send({message: "Unauthorized"})
                resolve(context.stop);
            } else {
                resolve(context.continue);
            }
        });
    })
};

// attach auth middleware for blogpost POST/DELETE/PUT endpoints
blogpostsResource.create.auth((req, res, context) => authenticationPromise(req, res, context))
blogpostsResource.delete.auth((req, res, context) => authenticationPromise(req, res, context))
blogpostsResource.update.auth((req, res, context) => authenticationPromise(req, res, context))

// sanitization of html from client prior to storage in DB
blogpostsResource.create.write.before((req, res, context) => sanitizer(req, res, context))

database
    .sync({ force: false })
    .then(function() {
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })
})
