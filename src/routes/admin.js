import express from 'express';
import multer from 'multer';

const adminRouter = express.Router();
let upload = multer();

import {
  getSystemConfig,
  addSystemConfig,
  deleteSystemConfig,
  addAdmin,
  editAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
  inactiveAdmin,
} from '../controllers';
import { checkToken } from '../middleware';

adminRouter.get('/system-config', checkToken, getSystemConfig);
adminRouter.post('/system-config', checkToken, addSystemConfig);
adminRouter.delete('/system-config/:id', deleteSystemConfig);

adminRouter.post('/admin', checkToken, addAdmin);
adminRouter.put('/admin/:uid', checkToken, editAdmin);
adminRouter.delete('/admin/:uid', checkToken, inactiveAdmin);
adminRouter.delete('/delete/admin/:id', deleteAdmin);
adminRouter.get('/admin/:uid', checkToken, getAdmin);
adminRouter.get('/admins', checkToken, getAdmins);

export default adminRouter;
