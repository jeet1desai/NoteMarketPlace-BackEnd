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
  addCategory,
  editCategory,
  getCategory,
  inactiveCategory,
  getCategories,
} from '../controllers';
import { checkToken } from '../middleware';

adminRouter.get('/system-config', checkToken, getSystemConfig);
adminRouter.post('/system-config', checkToken, addSystemConfig);

adminRouter.post('/', checkToken, addAdmin);
adminRouter.put('/:uid', checkToken, editAdmin);
adminRouter.get('/all', checkToken, getAdmins);
adminRouter.get('/:uid', checkToken, getAdmin);
adminRouter.delete('/:uid', checkToken, inactiveAdmin);

adminRouter.post('/category', checkToken, addCategory);
adminRouter.put('/category/:cid', checkToken, editCategory);
adminRouter.get('/category/all', checkToken, getCategories);
adminRouter.get('/category/:cid', checkToken, getCategory);
adminRouter.delete('/category/:cid', checkToken, inactiveCategory);

// adminRouter.post('/', checkToken, addType);
// adminRouter.put('/:uid', checkToken, editType);
// adminRouter.get('/all', checkToken, getTypes);
// adminRouter.get('/:uid', checkToken, getType);
// adminRouter.delete('/:uid', checkToken, inactiveType);

// adminRouter.post('/', checkToken, addCountry);
// adminRouter.put('/:uid', checkToken, editCountry);
// adminRouter.get('/all', checkToken, getCountries);
// adminRouter.get('/:uid', checkToken, getCountry);
// adminRouter.delete('/:uid', checkToken, inactiveCountry);

export default adminRouter;
