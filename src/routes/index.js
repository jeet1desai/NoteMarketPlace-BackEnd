import express from 'express';

import { indexPage, messagesPage, addMessage } from '../controllers';
import { modifyMessage } from '../middleware';
import authRouter from './auth';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.use('/auth', authRouter);
// indexRouter.get('/messages', messagesPage);
// indexRouter.post('/messages', modifyMessage, addMessage);

export default indexRouter;
