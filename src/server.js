const app = require('./app')
const Sequelize = require('sequelize')
const finale = require('finale-rest')
const authentication = require('./middleware/okta-auth')
const sanitizer = require('./middleware/html-sanitizer')
const { PORT } = require('./config')

// Configure DB and add blogpost model
const database = new Sequelize('mmdeblogdb', 'AlexBraden', '', { dialect: 'postgres' });
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

// setup auth for POST/DELETE/PUT endpoints
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
