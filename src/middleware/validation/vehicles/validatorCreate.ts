import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = (req: Request, res: Response, next: NextFunction) => {
  let { vin, make, model, licensePlate, personId } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  vin = String(vin || '');
  make = String(make || '');
  model = String(model || '');
  licensePlate = String(licensePlate || '');
  personId = String(personId || '');

  if (validator.isEmpty(vin)) {
    errorsValidation.push({ vin: 'Vin is required' });
  }

  if (validator.isEmpty(make)) {
    errorsValidation.push({ make: 'Make is required' });
  }

  if (validator.isEmpty(model)) {
    errorsValidation.push({ model: 'Model is required' });
  }

  if (validator.isEmpty(licensePlate)) {
    errorsValidation.push({ licensePlate: 'License plate is required' });
  }

  if (validator.isEmpty(personId) || !validator.isNumeric(personId)) {
    errorsValidation.push({ personId: 'Proper person id is required' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Create validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
