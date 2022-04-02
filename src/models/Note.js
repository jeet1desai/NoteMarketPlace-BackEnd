import moment from 'moment';

import { pool } from './pool';

class Note {
  constructor() {
    this.pool = pool;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getUserInfoByID(id) {
    let query = `SELECT * FROM Users WHERE ID = ${id} AND RoleID = 1`;
    return this.pool.query(query);
  }

  async addNote(note, user) {
    const time = moment().format();
    const {
      title,
      displaypicture,
      numberofpages,
      description,
      universityname,
      course,
      coursecode,
      professor,
      ispaid,
      sellingprice,
      status,
      notespreview,
      filename,
      file,
      filesize,
      country,
      notetype,
      category,
    } = note;
    let query = `INSERT INTO 
      SellerNotes(Title, DisplayPicture, NumberofPages, Description, UniversityName, Course, CourseCode,
        Professor, IsPaid, SellingPrice, Status, NotesPreview, FileName, File, FileSize, Country, NoteType, 
        Category, SellerID ,CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, IsActive) 
      VALUES('${title}', '${displaypicture}', ${numberofpages}, '${description}', 
        '${universityname}', '${course}', '${coursecode}', '${professor}', 
        ${ispaid}, ${sellingprice}, '${status}', '${notespreview}', '${filename}',
        '${file}', '${filesize}', ${country}, ${notetype},
        ${category}, ${user}, '${time}', ${user}, '${time}', ${user},  ${true}) RETURNING *
    `;
    return this.pool.query(query);
  }
}

export default Note;
