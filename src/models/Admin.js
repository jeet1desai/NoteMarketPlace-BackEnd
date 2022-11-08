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
      ID, RoleID, FirstName, LastName, Email, IsActive, ModifiedDate, PhoneCountryCode, PhoneNumber 
      FROM Users WHERE RoleID = 2 ORDER BY ID
    `;
    return this.pool.query(query);
  }

  async searchAdmin(search) {
    const isDate = moment(search, 'DD MMM YYYY', true).isValid();
    let query = `SELECT 
      ID, RoleID, FirstName, LastName, Email, IsActive, ModifiedDate, PhoneCountryCode, PhoneNumber 
      FROM Users WHERE RoleID = 2 AND LOWER(FirstName) LIKE '%${search}%' 
      OR LOWER(LastName) LIKE '%${search}%' OR LOWER(Email) LIKE '%${search}%' 
      OR LOWER(PhoneNumber) LIKE '%${search}%' OR LOWER(PhoneCountryCode) LIKE '%${search}%'
    `;
    if (isDate) {
      query += `OR DATE(ModifiedDate) = '${search}' `;
    }
    query += ` ORDER BY ID`;
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

  async adminInfoByID(id) {
    let query = `SELECT * FROM Users WHERE ID = ${id} AND (RoleID = 3 OR RoleID = 2)`;
    return this.pool.query(query);
  }

  async addCategory({ name, description, user }) {
    const time = moment().format();
    let query = `INSERT INTO 
      NoteCategories(Name, Description, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES('${name}', '${description}', '${time}', ${user}, '${time}', ${user}, ${true}) 
      RETURNING ID, Name, Description
    `;
    return this.pool.query(query);
  }

  async updateCategory({ name, description, user, id }) {
    const time = moment().format();
    let query = `UPDATE NoteCategories 
      SET Name = '${name}', Description = '${description}', ModifiedDate = '${time}', 
        ModifiedBy = ${user} WHERE ID = ${id} RETURNING ID, Name, Description
    `;
    return this.pool.query(query);
  }

  async getAllCategory() {
    let query = `SELECT NoteCategories.ID, NoteCategories.Name, NoteCategories.Description,
      NoteCategories.IsActive, NoteCategories.ModifiedDate, Users.FirstName, Users.LastName
      FROM NoteCategories INNER JOIN Users ON NoteCategories.CreatedBy = Users.ID
    `;
    return this.pool.query(query);
  }

  async getCategory(id) {
    let query = `SELECT ID, Name, Description FROM NoteCategories WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async searchCategory(search) {
    const isDate = moment(search, 'DD MMM YYYY', true).isValid();
    let query = `SELECT NoteCategories.ID, NoteCategories.Name, NoteCategories.Description,
      NoteCategories.IsActive, NoteCategories.ModifiedDate, Users.FirstName, Users.LastName
      FROM NoteCategories INNER JOIN Users ON NoteCategories.CreatedBy = Users.ID
      WHERE LOWER(Users.FirstName) LIKE '%${search}%' OR LOWER(Users.LastName) LIKE '%${search}%' 
      OR LOWER(NoteCategories.Name) LIKE '%${search}%' 
      OR LOWER(NoteCategories.Description) LIKE '%${search}%' 
    `;
    if (isDate) {
      query += `OR DATE(NoteCategories.ModifiedDate) = '${search}' `;
    }
    query += ` ORDER BY NoteCategories.ID`;
    return this.pool.query(query);
  }

  async inactiveCategory(user, id) {
    const time = moment().format();
    let query = `UPDATE NoteCategories SET
      ModifiedDate = '${time}', ModifiedBy = ${user}, IsActive = ${false} 
        FROM Users WHERE NoteCategories.ID = ${id} AND NoteCategories.CreatedBy = Users.ID
      RETURNING NoteCategories.ID, NoteCategories.Name, NoteCategories.Description,
        NoteCategories.IsActive, NoteCategories.CreatedDate, Users.FirstName, Users.LastName
    `;
    return this.pool.query(query);
  }

  async addType({ name, description, user }) {
    const time = moment().format();
    let query = `INSERT INTO 
      NoteTypes(Name, Description, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES('${name}', '${description}', '${time}', ${user}, '${time}', ${user}, ${true}) 
      RETURNING ID, Name, Description
    `;
    return this.pool.query(query);
  }

  async updateType({ name, description, user, id }) {
    const time = moment().format();
    let query = `UPDATE NoteTypes 
      SET Name = '${name}', Description = '${description}', ModifiedDate = '${time}', 
        ModifiedBy = ${user} WHERE ID = ${id} RETURNING ID, Name, Description
    `;
    return this.pool.query(query);
  }

  async getAllType() {
    let query = `SELECT NoteTypes.ID, NoteTypes.Name, NoteTypes.Description, NoteTypes.IsActive, 
      NoteTypes.ModifiedDate, Users.FirstName, Users.LastName FROM NoteTypes INNER JOIN Users 
      ON NoteTypes.CreatedBy = Users.ID
    `;
    return this.pool.query(query);
  }

  async getType(id) {
    let query = `SELECT ID, Name, Description FROM NoteTypes WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async inactiveType(user, id) {
    const time = moment().format();
    let query = `UPDATE NoteTypes SET ModifiedDate = '${time}', ModifiedBy = ${user}, IsActive = ${false} 
      FROM Users WHERE NoteTypes.ID = ${id} AND NoteTypes.CreatedBy = Users.ID
      RETURNING NoteTypes.ID, NoteTypes.Name, NoteTypes.Description, NoteTypes.IsActive, 
        NoteTypes.CreatedDate, Users.FirstName, Users.LastName
    `;
    return this.pool.query(query);
  }

  async searchType(search) {
    const isDate = moment(search, 'DD MMM YYYY', true).isValid();
    let query = `SELECT NoteTypes.ID, NoteTypes.Name, NoteTypes.Description, NoteTypes.IsActive, 
      NoteTypes.ModifiedDate, Users.FirstName, Users.LastName FROM NoteTypes INNER JOIN Users 
      ON NoteTypes.CreatedBy = Users.ID
      WHERE LOWER(Users.FirstName) LIKE '%${search}%' OR LOWER(Users.LastName) LIKE '%${search}%' 
      OR LOWER(NoteTypes.Name) LIKE '%${search}%' 
      OR LOWER(NoteTypes.Description) LIKE '%${search}%' 
    `;
    if (isDate) {
      query += `OR DATE(NoteTypes.ModifiedDate) = '${search}' `;
    }
    query += ` ORDER BY NoteTypes.ID`;
    return this.pool.query(query);
  }

  async addCountry({ name, code, user }) {
    const time = moment().format();
    let query = `INSERT INTO 
      Countries(Name, CountryCode, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES('${name}', '${code}', '${time}', ${user}, '${time}', ${user}, ${true}) 
      RETURNING ID, Name, CountryCode
    `;
    return this.pool.query(query);
  }

  async updateCountry({ name, code, user, id }) {
    const time = moment().format();
    let query = `UPDATE Countries
      SET Name = '${name}', CountryCode = '${code}', ModifiedDate = '${time}',
      ModifiedBy = ${user} WHERE ID = ${id} RETURNING ID, Name, CountryCode
    `;
    return this.pool.query(query);
  }

  async getAllCountry() {
    let query = `SELECT Countries.ID, Countries.Name, Countries.CountryCode, Countries.IsActive,
      Countries.ModifiedDate, Users.FirstName, Users.LastName FROM Countries INNER JOIN Users
      ON Countries.CreatedBy = Users.ID
    `;
    return this.pool.query(query);
  }

  async searchCountry(search) {
    const isDate = moment(search, 'DD MMM YYYY', true).isValid();
    let query = `SELECT Countries.ID, Countries.Name, Countries.CountryCode, Countries.IsActive,
      Countries.ModifiedDate, Users.FirstName, Users.LastName FROM Countries INNER JOIN Users
      ON Countries.CreatedBy = Users.ID
      WHERE LOWER(Users.FirstName) LIKE '%${search}%' OR LOWER(Users.LastName) LIKE '%${search}%' 
      OR LOWER(Countries.Name) LIKE '%${search}%' 
      OR LOWER(Countries.CountryCode) LIKE '%${search}%' 
    `;
    if (isDate) {
      query += `OR DATE(Countries.ModifiedDate) = '${search}' `;
    }
    query += ` ORDER BY Countries.ID`;
    return this.pool.query(query);
  }

  async getCountry(id) {
    let query = `SELECT ID, Name, CountryCode FROM Countries WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async inactiveCountry(user, id) {
    const time = moment().format();
    let query = `UPDATE Countries SET ModifiedDate = '${time}', ModifiedBy = ${user}, IsActive = ${false}
      FROM Users WHERE Countries.ID = ${id} AND Countries.CreatedBy = Users.ID
      RETURNING Countries.ID, Countries.Name, Countries.CountryCode, Countries.IsActive,
      Countries.CreatedDate, Users.FirstName, Users.LastName
    `;
    return this.pool.query(query);
  }

  // Dashboard
  async getStatInReviewNote() {
    let query = `SELECT COUNT(*) FROM SellerNotes WHERE Status = 'In Review'`;
    return this.pool.query(query);
  }

  async getStatDownloadedNote() {
    let query = `SELECT COUNT(*) FROM Downloads WHERE ModifiedDate > CURRENT_DATE - 7`;
    return this.pool.query(query);
  }

  async getStatNewRegistration() {
    let query = `SELECT COUNT(*) FROM Users WHERE CreatedDate > CURRENT_DATE - 7`;
    return this.pool.query(query);
  }

  // async publishedNotes(month, search) {
  //   const isDate = moment(search, 'DD MMM YYYY', true).isValid();
  //   let query = `SELECT SellerNotes.ID, SellerNotes.Title, SellerNotes.FileSize, SellerNotes.IsPaid, 
  //     SellerNotes.Status, SellerNotes.SellingPrice, SellerNotes.ModifiedDate, NoteCategories.Name, 
  //     Users.FirstName, Users.LastName, (SELECT COUNT(*) FROM Downloads WHERE 
  //       Downloads.NoteID = SellerNotes.ID AND 
  //       (Downloads.CreatedDate > CURRENT_DATE - INTERVAL '${month} months')
  //     ) FROM SellerNotes INNER JOIN NoteCategories ON SellerNotes.Category = NoteCategories.ID
  //     INNER JOIN Users ON SellerNotes.SellerID = Users.ID WHERE (
  //       (SellerNotes.ModifiedDate > CURRENT_DATE - INTERVAL '${month} months') AND SellerNotes.Status = 'Published'
  //     ) AND (LOWER(Users.FirstName) LIKE '%${search}%' 
  //     OR LOWER(Users.LastName) LIKE '%${search}%' OR LOWER(SellerNotes.Title) LIKE '%${search}%' 
  //     OR LOWER(SellerNotes.FileSize) LIKE '%${search}%' OR LOWER(NoteCategories.Name) LIKE '%${search}%'
  //   `;
  //   if (parseInt(search)) {
  //     query += ` OR SellerNotes.SellingPrice = ${search} `;
  //   }
  //   if (isDate) {
  //     query += ` OR DATE(SellerNotes.ModifiedDate) = '${search}' `;
  //   }
  //   query += `) ORDER BY SellerNotes.ID`;
  //   return this.pool.query(query);
  // }
}

export default Admin;
