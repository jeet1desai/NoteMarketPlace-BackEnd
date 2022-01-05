import moment from 'moment';

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

  async addSystemConfig(values) {
    const { email, phone, profile, note, facebook, twitter, linkedin, user } =
      values;
    const time = moment().format();
    let query = `INSERT INTO 
      SystemConfigurations(Email, PhoneNumber, ProfilePicture, NotePicture, 
        FacebookURL, TwitterURL, LinkedInURL, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES('${email}', '${phone}', '${profile}', '${note}', '${facebook}', '${twitter}', '${linkedin}', 
        '${time}', ${user}, '${time}', ${user},  ${true}) RETURNING *
    `;
    return this.pool.query(query);
  }

  async deleteSystemConfig(id) {
    let query = `DELETE FROM SystemConfigurations WHERE id = ${id}`;
    return this.pool.query(query);
  }

  async addAdmin({
    firstName,
    lastName,
    email,
    password,
    countryCode,
    phone,
    user,
  }) {
    const time = moment().format();
    let query = `INSERT INTO 
      users(RoleID, FirstName, LastName, Email, Password, IsEmailVerified, 	PhoneCountryCode,
        PhoneNumber, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES(${2}, '${firstName}', '${lastName}', '${email}', '${password.toString()}', ${false}, 
        '${countryCode}', '${phone}', '${time}', ${user}, '${time}', ${user}, ${true}) RETURNING *
    `;
    return this.pool.query(query);
  }
}

export default Admin;
