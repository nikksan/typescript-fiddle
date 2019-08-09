const path = require('path');

export default {
  db: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../../db.sqlite')
    },
    migrations: {
      directory: path.join(__dirname, '../infrastructure/migrations')
    },
    useNullAsDefault: true
  }
}
