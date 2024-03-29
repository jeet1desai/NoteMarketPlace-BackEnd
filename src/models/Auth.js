import moment from 'moment';

import { pool } from './pool';

class Auth {
  constructor() {
    this.pool = pool;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async isUserExist(column, value) {
    let query = `SELECT * FROM users WHERE ${column} = '${value}'`;
    return this.pool.query(query);
  }

  async register({ firstName, lastName, email, password, profileImage }) {
    const time = moment().format();
    let query = `INSERT INTO 
      users(RoleID, FirstName, LastName, Email, Password, IsEmailVerified, ProfilePicture, 
        CreatedDate, ModifiedDate, IsActive) 
      VALUES(${1}, '${firstName}', '${lastName}', '${email}', '${password.toString()}', ${false}, 
        '${profileImage}', '${time}', '${time}', ${true}) RETURNING *
    `;
    return this.pool.query(query);
  }

  async verify(flag, id) {
    let query = `UPDATE USERS SET IsEmailVerified = ${flag} WHERE id = ${id} RETURNING *`;
    return this.pool.query(query);
  }

  async getSystemConfig() {
    let query = `SELECT * FROM SystemConfigurations ORDER BY ID DESC LIMIT 1`;
    return this.pool.query(query);
  }
}

export default Auth;
