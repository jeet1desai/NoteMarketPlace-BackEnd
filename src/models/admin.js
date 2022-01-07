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

  async getSAdminInfoByID(id) {
    let query = `SELECT * FROM Users WHERE ID = ${id} AND RoleID = 3`;
    return this.pool.query(query);
  }

  async getAdminInfoByID(id) {
    let query = `SELECT * FROM Users WHERE ID = ${id} AND RoleID = 2`;
    return this.pool.query(query);
  }

  async getInfoByEmail(email) {
    let query = `SELECT * FROM Users WHERE Email = '${email}'`;
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

  async getSystemConfig() {
    let query = `SELECT * FROM SystemConfigurations ORDER BY ID DESC LIMIT 1`;
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
      Users(RoleID, FirstName, LastName, Email, Password, IsEmailVerified, 	PhoneCountryCode,
        PhoneNumber, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES(${2}, '${firstName}', '${lastName}', '${email}', '${password.toString()}', ${false}, 
        '${countryCode}', '${phone}', '${time}', ${user}, '${time}', ${user}, ${true}) 
      RETURNING ID, FirstName, LastName, Email, PhoneCountryCode, PhoneNumber
    `;
    return this.pool.query(query);
  }

  async updateAdmin({
    firstName,
    lastName,
    email,
    countryCode,
    phone,
    user,
    sAdmin,
  }) {
    const time = moment().format();
    let query = `UPDATE Users 
      SET FirstName = '${firstName}', LastName = '${lastName}', Email = '${email}', 
        PhoneCountryCode = '${countryCode}', PhoneNumber = '${phone}', ModifiedDate = '${time}', 
        ModifiedBy = ${sAdmin} 
      WHERE ID = ${user} 
      RETURNING ID, FirstName, LastName, Email, PhoneCountryCode, PhoneNumber
    `;
    return this.pool.query(query);
  }

  async getAllAdmin() {
    let query = `SELECT 
      ID, RoleID, FirstName, LastName, Email, IsActive, CreatedDate, PhoneCountryCode, PhoneNumber 
      FROM Users WHERE RoleID = 2
    `;
    return this.pool.query(query);
  }

  async getAdmin(id) {
    let query = `SELECT ID, FirstName, LastName, Email, PhoneCountryCode, PhoneNumber
      FROM Users WHERE ID = ${id} AND RoleID = 2
    `;
    return this.pool.query(query);
  }

  async inactiveAdmin(uid, aid) {
    const time = moment().format();
    let query = `UPDATE Users SET 
      ModifiedDate = '${time}', ModifiedBy = ${aid}, IsActive = ${false} WHERE ID = ${uid} 
      RETURNING ID, FirstName, LastName, Email, IsActive, CreatedDate, PhoneCountryCode, PhoneNumber
    `;
    return this.pool.query(query);
  }
}

export default Admin;
