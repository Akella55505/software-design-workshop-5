import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = (req: Request, res: Response, next: NextFunction) => {
  let { date, media } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (media !== undefined) {
    media = String(media || '');
    if (!validator.isJSON(media)) {
      errorsValidation.push({ media: 'Media must be a JSON' });
    }
  }

  if (date !== undefined) {
    date = String(date || '');
    if (!validator.isDate(date)) {
      errorsValidation.push({ date: 'Proper date is required' });
    }
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Create validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
