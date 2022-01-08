import express from 'express';

import {
  allCategory,
  allSystemConfig,
  deleteCategory,
  deleteSystemConfig,
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

export default router;
