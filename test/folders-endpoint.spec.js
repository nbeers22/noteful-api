const knex = require('knex');
const app = require('../src/app.js');
const testFolders = require('./folders.fixtures.js');

describe.only('Folders Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db',db);
  });

  after('disconnect from db', () => {
    db.destroy();
  });

  before('clean the tables', () => {
    db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE');
  });

  afterEach('Remove test folders from table', () => {
    db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE');
  });

  describe('GET /api/folders', () => {
    context('Given folders table has data', () => {
      beforeEach('Insert test folders into folders table', () => {
        return db
          .into('folders')
          .insert(testFolders)
      });

      it('responds with 200 and list of folders', () => {
        return supertest(app)
          .get('/api/folders')
          .expect(200,testFolders)
      });
    });
    context('Given folders table has no data', () => {

    });
  });
  
});
