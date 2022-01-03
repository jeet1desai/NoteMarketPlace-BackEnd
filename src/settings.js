import dotenv from 'dotenv';
dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;
export const dbConnectionString = process.env.DB_URL;
export const secretKey = process.env.SECRET_KEY;
export const clientURL = process.env.CLIENT_URL;
export const emailUser = process.env.EMAIL_USERNAME;
export const emailPass = process.env.EMAIL_PASSWORD;
export const aEmail = process.env.EMAIL;
