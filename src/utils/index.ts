import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../exceptions/customError';

/**
 * A function to hash passwords using bcrypt.js
 *
 * @param {string} password - The password to hash
 * @returns {Promise<string>} A promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compare password
 *
 * @param password - The password to compare
 * @param hash - The hash to compare
 * @returns A promise that resolves to a boolean
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate token
 *
 * @param payload - The payload to sign
 * @returns The generated token
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};

/**
 * Verify token
 *
 * @param token - The token to verify
 * @returns The decoded token
 */
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
};
