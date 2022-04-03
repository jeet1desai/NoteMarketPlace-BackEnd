import express from 'express';

import {
  allSystemConfig,
  deleteCategory,
  deleteCountry,
  deleteSystemConfig,
  deleteType,
  deleteUser,
  getAllNotes,
  getAllUsers,
  getUsersByRoleID,
} from '../controllers/not';

const router = express.Router();

router.get('/users/all', getAllUsers);
router.get('/users/:rid', getUsersByRoleID);
router.delete('/users/:id', deleteUser);

router.get('/system-config/all', allSystemConfig);
router.delete('/system-config/:id', deleteSystemConfig);

router.delete('/category/:id', deleteCategory);

router.delete('/type/:id', deleteType);

router.delete('/country/:id', deleteCountry);

router.get('/notes', getAllNotes);

export default router;
