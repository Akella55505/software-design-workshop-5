import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = (req: Request, res: Response, next: NextFunction) => {
  let { passportData, firstName, lastName, patronymic, driverLicense } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  passportData = String(passportData || '');
  firstName = String(firstName || '');
  lastName = String(lastName || '');
  patronymic = String(patronymic || '');

  if (driverLicense !== undefined) {
    driverLicense = String(driverLicense || '');
    if (!validator.isJSON(driverLicense)) {
      errorsValidation.push({ driverLicense: "Driver's license must be a JSON" });
    }
  }

  if (validator.isEmpty(passportData)) {
    errorsValidation.push({ passportData: 'Passport data is required' });
  }

  if (validator.isEmpty(firstName)) {
    errorsValidation.push({ firstName: 'First name is required' });
  }

  if (validator.isEmpty(lastName)) {
    errorsValidation.push({ lastName: 'Last name is required' });
  }

  if (validator.isEmpty(patronymic)) {
    errorsValidation.push({ patronymic: 'Patronymic is required' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Create validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
