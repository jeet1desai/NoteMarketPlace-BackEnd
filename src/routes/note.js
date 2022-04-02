import express from 'express';
import { addNote } from '../controllers/note';
const noteRouter = express.Router();

import { checkToken } from '../middleware';


noteRouter.post('/add-note', checkToken, addNote);

export default noteRouter;