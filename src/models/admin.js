import { pool } from './pool';

class Admin {
  constructor() {
    this.pool = pool;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getUserInfo(column, value) {
    let query = `SELECT * FROM users WHERE ${column} = '${value}'`;
    return this.pool.query(query);
  }

  async getSystemConfig() {
    let query = `SELECT * FROM SystemConfigurations ORDER BY id DESC LIMIT 1`;
    return this.pool.query(query);
  }




}

export default Admin;