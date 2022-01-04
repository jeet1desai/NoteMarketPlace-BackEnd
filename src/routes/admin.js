import express from 'express';
import multer from 'multer';

const adminRouter = express.Router();
let upload = multer()

import {
  addAdmin,
  addSystemConfig,
  deleteAdmin,
  editAdmin,
  getAdmin,
  getAdmins,
  getSystemConfig,
} from '../controllers';
import { checkToken } from '../middleware';

adminRouter.get('/system-config', checkToken, getSystemConfig);
const cpUpload = upload.fields([
  { name: 'note_image', maxCount: 1 },
  { name: 'profile_image', maxCount: 1 },
]);
adminRouter.post('/system-config', checkToken, cpUpload, addSystemConfig);

adminRouter.get('/admin', checkToken, getAdmins);
adminRouter.get('/admin/1', checkToken, getAdmin);
adminRouter.post('/admin', checkToken, addAdmin);
adminRouter.put('/admin/1', checkToken, editAdmin);
adminRouter.delete('/admin/1', checkToken, deleteAdmin);

export default adminRouter;
