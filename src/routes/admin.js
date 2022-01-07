import express from 'express';
const adminRouter = express.Router();

import {
  getSystemConfig,
  addSystemConfig,
  addAdmin,
  editAdmin,
  getAdmin,
  getAdmins,
  inactiveAdmin,
} from '../controllers';
import { checkToken } from '../middleware';

adminRouter.get('/system-config', checkToken, getSystemConfig);
adminRouter.post('/system-config', checkToken, addSystemConfig);

adminRouter.post('/', checkToken, addAdmin);
adminRouter.put('/:uid', checkToken, editAdmin);
adminRouter.get('/all', checkToken, getAdmins);
adminRouter.get('/:uid', checkToken, getAdmin);
adminRouter.delete('/:uid', checkToken, inactiveAdmin);

export default adminRouter;
