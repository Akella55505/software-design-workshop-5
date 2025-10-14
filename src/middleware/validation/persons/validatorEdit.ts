import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = (req: Request, res: Response, next: NextFunction) => {
  let { license } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (license !== undefined) {
    license = String(license || '');
    if (!validator.isJSON(license)) {
      errorsValidation.push({ license: "Driver's license must be a JSON" });
    }
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Create validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
