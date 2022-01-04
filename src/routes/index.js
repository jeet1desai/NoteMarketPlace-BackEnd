import express from 'express';

import { indexPage } from '../controllers';
import { modifyMessage } from '../middleware';
import authRouter from './auth';
import adminRouter from './admin';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.use('/auth', authRouter);
indexRouter.use('/admin', adminRouter);
// indexRouter.post('/messages', modifyMessage, addMessage);

export default indexRouter;
