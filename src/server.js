const app = require('./app.js');
const knex = require('knex');
const { PORT, DB_URL } = require('./config.js');

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db',db);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});