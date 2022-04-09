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
  addType,
  editType,
  getType,
  getTypes,
  inactiveType,
  addCountry,
  editCountry,
  getCountries,
  getCountry,
  inactiveCountry,
  searchCategory,
  searchType,
  searchCountry,
  searchAdmin,
} from '../../controllers';
import { checkToken } from '../../middleware';

adminRouter.get('/system-config', checkToken, getSystemConfig);
adminRouter.post('/system-config', checkToken, addSystemConfig);

adminRouter.get('/search', checkToken, searchAdmin);
adminRouter.post('/', checkToken, addAdmin);
adminRouter.put('/:uid', checkToken, editAdmin);
adminRouter.get('/all', checkToken, getAdmins);
adminRouter.get('/:uid', checkToken, getAdmin);
adminRouter.delete('/:uid', checkToken, inactiveAdmin);

adminRouter.get('/category/search', checkToken, searchCategory);
adminRouter.post('/category', checkToken, addCategory);
adminRouter.put('/category/:cid', checkToken, editCategory);
adminRouter.get('/category/all', getCategories);
adminRouter.get('/category/:cid', checkToken, getCategory);
adminRouter.delete('/category/:cid', checkToken, inactiveCategory);

adminRouter.get('/type/search', checkToken, searchType);
adminRouter.post('/type', checkToken, addType);
adminRouter.put('/type/:tid', checkToken, editType);
adminRouter.get('/type/all', getTypes);
adminRouter.get('/type/:tid', checkToken, getType);
adminRouter.delete('/type/:tid', checkToken, inactiveType);

adminRouter.get('/country/search', checkToken, searchCountry);
adminRouter.post('/country', checkToken, addCountry);
adminRouter.put('/country/:cid', checkToken, editCountry);
adminRouter.get('/country/all', getCountries);
adminRouter.get('/country/:cid', checkToken, getCountry);
adminRouter.delete('/country/:cid', checkToken, inactiveCountry);

export default adminRouter;
