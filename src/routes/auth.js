import express from 'express';
const authRouter = express.Router();

import { login, register, sendEmail, verifyEmail } from '../controllers';

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/confirm', sendEmail);
authRouter.get('/confirm/:id', verifyEmail);

export default authRouter;
