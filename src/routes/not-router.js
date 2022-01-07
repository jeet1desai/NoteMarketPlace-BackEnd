import express from 'express';

import {
  allSystemConfig,
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

export default router;
