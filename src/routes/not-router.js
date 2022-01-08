import express from 'express';

import {
  allCategory,
  allCountry,
  allSystemConfig,
  allType,
  deleteCategory,
  deleteCountry,
  deleteSystemConfig,
  deleteType,
  deleteUser,
  getAllUsers,
  getUsersByRoleID,
} from '../controllers/not';

const router = express.Router();

router.get('/users/all', getAllUsers);
router.get('/users/:rid', getUsersByRoleID);
router.delete('/users/:id', deleteUser);

router.get('/system-config/all', allSystemConfig);
router.delete('/system-config/:id', deleteSystemConfig);

router.get('/category/all', allCategory);
router.delete('/category/:id', deleteCategory);

router.get('/type/all', allType);
router.delete('/type/:id', deleteType);

router.get('/country/all', allCountry);
router.delete('/country/:id', deleteCountry);

export default router;
