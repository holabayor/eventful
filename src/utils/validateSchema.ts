import Joi from 'joi';
import { ValidationError } from '../exceptions/customError';

/**
 * Helper function to validate schema
 *
 * @param schema - Joi schema
 * @param data - data to validate
 * @returns void
 */
export const validateSchema = (schema: Joi.ObjectSchema, data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    console.log('There is an error here', error);
    throw new ValidationError(error.details[0].message);
  }
};
