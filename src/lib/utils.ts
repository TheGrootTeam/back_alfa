import bcrypt from 'bcrypt'; //import library to hash passwords
import dotenv from 'dotenv'; //import env variables
import process from 'process';
dotenv.config();

// Encrypt password
const hashPassword = async function (password: string): Promise<string> {
  // const mySalt:  string = process.env.MY_SALT as string;
  // const mySaltNum = parseInt(mySalt, 10);
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

// Verify password
const comparePassword = async function (password: string, storedHash: string): Promise<boolean> {
  const isValid = await bcrypt.compare(password, storedHash);
  return isValid;
};

export const getHost = (hostname: string): string => {
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = isProduction && hostname !== 'localhost' ? 'https' : 'http';
  const port = isProduction ? '' : `:${process.env.CLIENT_PORT}`;
  return `${protocol}://${hostname}${port}`;
  // return `${protocol}://${process.env.WEB_HOST}${port}`;
};

export { hashPassword, comparePassword };
