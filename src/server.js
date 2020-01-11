const database = require('./database');
const app = require('./app');
const { PORT } = require('./config');

database
    .sync({ force: false })
    .then(app.listen(PORT))
