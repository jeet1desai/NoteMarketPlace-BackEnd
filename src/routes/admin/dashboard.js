import express from 'express';
const aDashboardRouter = express.Router();

import { checkToken } from '../../middleware';
import { getStats, publishedNotes } from '../../controllers';

aDashboardRouter.get('/stats', checkToken, getStats);
aDashboardRouter.get('/published', checkToken, publishedNotes);

export default aDashboardRouter;
