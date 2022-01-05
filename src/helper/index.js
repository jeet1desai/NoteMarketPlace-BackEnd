import nodemailer from 'nodemailer';
import { emailPass, emailUser } from '../settings';

export const sAdminTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});
