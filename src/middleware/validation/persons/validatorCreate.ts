import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = (req: Request, res: Response, next: NextFunction) => {
  let { passportData, name, surname, patronymic, driverLicense } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  name = String(name || '');
  surname = String(surname || '');
  patronymic = String(patronymic || '');

  if (driverLicense !== undefined) {
    driverLicense = String(driverLicense || '');
    if (!validator.isJSON(driverLicense)) {
      errorsValidation.push({ driverLicense: "Driver's license must be a JSON" });
    }
  }

  if (passportData !== undefined) {
    passportData = String(passportData || '');
    if (!validator.isJSON(passportData)) {
      errorsValidation.push({ passportData: 'Passport data must be a JSON' });
    }
  }

  if (validator.isEmpty(name)) {
    errorsValidation.push({ name: 'First name is required' });
  }

  if (validator.isEmpty(surname)) {
    errorsValidation.push({ surname: 'Last name is required' });
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
