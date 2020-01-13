const app = require('./app');
const database = require('./database');
const { PORT } = require('./config');

database
    .sync({ force: false })
    .then(app.listen(PORT))
