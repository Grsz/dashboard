exports.db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'hrger',
      password : 'Xezeru007',
      database : 'therapy'
    }
  });