import express from 'express';
const noteRouter = express.Router();

import { addNote, editNote } from '../controllers/note';
import { checkToken } from '../middleware';


noteRouter.post('/add-note', checkToken, addNote);
noteRouter.put('/edit-note/:nid', checkToken, editNote);

export default noteRouter;