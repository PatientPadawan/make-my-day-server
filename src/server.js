const app = require('./app');
const sequelize = require('./database');
const { PORT } = require('./config');

sequelize
    .sync({ force: false })
    .then(app.listen(PORT))
