const database = require('./database');
const app = require('./app');
const { PORT } = require('./config');

database
    .sync({ force: false })
    .then(function() {
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })
})