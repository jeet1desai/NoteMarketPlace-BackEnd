import { pool } from './pool';

class Not {
  constructor() {
    this.pool = pool;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getAllUsers() {
    let query = `SELECT * FROM Users ORDER BY ID`;
    return this.pool.query(query);
  }

  async getUsersByRoleID(rid) {
    let query = `SELECT * FROM Users WHERE RoleID = ${rid} ORDER BY ID `;
    return this.pool.query(query);
  }

  async deleteUser(id) {
    let query = `DELETE FROM Users WHERE id = ${id}`;
    return this.pool.query(query);
  }

  async getAllSystemConfig() {
    let query = `SELECT * FROM SystemConfigurations ORDER BY ID`;
    return this.pool.query(query);
  }

  async deleteSystemConfig(id) {
    let query = `DELETE FROM SystemConfigurations WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async deleteCategory(id) {
    let query = `DELETE FROM NoteCategories WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async deleteType(id) {
    let query = `DELETE FROM NoteTypes WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async deleteCountry(id) {
    let query = `DELETE FROM Countries WHERE ID = ${id}`;
    return this.pool.query(query);
  }

  async getAllNotes() {
    let query = `SELECT * FROM SellerNotes ORDER BY ID`;
    return this.pool.query(query);
  }

  async deleteNote(id) {
    let query = `DELETE FROM SellerNotes WHERE ID = ${id}`;
    console.log(query);
    return this.pool.query(query);
  }
}

export default Not;
