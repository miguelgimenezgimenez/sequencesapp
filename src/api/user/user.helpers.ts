import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { SECRET_KEY, JWT_ACCESS_TOKEN_LIFETIME, SALT_ROUNDS } from '../../config';
import { IUser } from '../../models/user';


export type UserShape = {
  email: string
  role: string
  _id: string
  dateAdded: string
};

export const shapeUser = (user: IUser): UserShape => {
  return {
    email: user.email,
    role: user.role,
    _id: user._id,
    dateAdded: user.dateAdded.toISOString()
  }
}
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const signAccessToken = (id: string, role: string) => {
  const accessToken = jwt.sign({ id, role }, SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
  });

  return accessToken;
};

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
}

