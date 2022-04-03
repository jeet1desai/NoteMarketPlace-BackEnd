import Note from '../models/Note';

const noteModel = new Note();

export const addNote = async (req, res) => {
  const { id } = req;

  try {
    const user = await noteModel.getUserInfoByID(id);
    if (user.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const note = await noteModel.addNote(req.body, id);

    return res.status(200).json(note.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

export const editNote = async (req, res) => {
  const { id } = req;
  const { nid } = req.params;

  try {
    const user = await noteModel.getUserInfoByID(id);
    if (user.rowCount === 0) {
      return res
        .status(404)
        .json({ message: 'You are not valid user to perform task' });
    }

    const isNote = await noteModel.getNoteInfoByID(nid);
    if (isNote.rowCount === 0) {
      return res.status(404).json({ message: 'Note is not available!' });
    }

    const note = await noteModel.editNote(req.body, id, nid);

    console.log(note.rows);

    return res.status(200).json(note.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};
