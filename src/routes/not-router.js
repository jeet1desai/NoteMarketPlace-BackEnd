import express from 'express';

import {
  allCategory,
  allSystemConfig,
  allType,
  deleteCategory,
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

export default router;
