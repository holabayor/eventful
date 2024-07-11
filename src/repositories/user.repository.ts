import logger from '../config/logger';
import { ConflictError, DatabaseError } from '../exceptions/customError';
import { IUser, User } from '../models/user';
import { ICreate } from './IRepositiory';

export class UserRepository implements ICreate<IUser> {
  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    try {
      const user = await User.create(data);
      // user.save();
      logger.info('User created', { userId: user.id });
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        logger.error('Duplicate key error', { error: error.message });
        throw new ConflictError('User with email already exists');
      }
      logger.error('Database Error on create', { error: error.message });
      throw new DatabaseError(`${error.message}`);
    }
  }

  async findByField(fieldName: string, value: string): Promise<IUser | null> {
    try {
      console.log(typeof fieldName, typeof 'email');
      const user = await User.findOne({ email: value });
      logger.info(`User retrieved by field: ${fieldName}, ${value}`);
      return user;
    } catch (error: any) {
      console.log(error);
      logger.error('Database Error on findByField', {
        fieldName,
        value,
        error: error.message,
      });
      throw new DatabaseError(`${error.message}`);
    }
  }

  async findById(id: string): Promise<IUser | null> {
    try {
      const user = User.findById(id);
      logger.info('User retrieved by id', { userId: id });
      return user;
    } catch (error: any) {
      logger.error('Database Error on findById', {
        userId: id,
        error: error.message,
      });
      throw new DatabaseError(`${error.message}`);
    }
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = User.findByIdAndUpdate(id, data, {
        new: true,
      });
      logger.info('User updated', { userId: id });
      return user;
    } catch (error: any) {
      logger.error('Database Error on update', {
        userId: id,
        error: error.message,
      });
      throw new DatabaseError(`Database Error:, ${error.message}`);
    }
  }
}
