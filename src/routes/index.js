import express from 'express';

import { indexPage } from '../controllers';
import authRouter from './auth';
import adminRouter from './admin/settings';
import aDashboardRouter from './admin/dashboard';
import noteRouter from './note';
import router from './not-router';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.use('/auth', authRouter);
indexRouter.use('/admin/settings', adminRouter);
indexRouter.use('/admin/dashboard', aDashboardRouter);
indexRouter.use('/note', noteRouter);
indexRouter.use('/not', router);
// indexRouter.post('/messages', modifyMessage, addMessage);

export default indexRouter;
