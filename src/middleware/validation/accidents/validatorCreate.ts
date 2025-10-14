import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = (req: Request, res: Response, next: NextFunction) => {
  let { date, time, location, causes, type, assessmentStatus, considerationStatus, media } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  date = String(date || '');
  time = String(time || '');
  location = String(location || '');
  causes = String(causes || '');
  type = String(type || '');
  assessmentStatus = String(assessmentStatus || '');
  considerationStatus = String(considerationStatus || '');

  if (media !== undefined) {
    media = String(media || '');
    if (!validator.isJSON(media)) {
      errorsValidation.push({ media: 'Media must be a JSON' });
    }
  }

  if (validator.isEmpty(date) || !validator.isDate(date)) {
    errorsValidation.push({ date: 'Proper date is required' });
  }

  if (validator.isEmpty(time)) {
    errorsValidation.push({ time: 'Proper time is required' });
  }

  if (validator.isEmpty(location)) {
    errorsValidation.push({ location: 'Location is required' });
  }

  if (validator.isEmpty(causes)) {
    errorsValidation.push({ causes: 'Causes are required' });
  }

  if (validator.isEmpty(type)) {
    errorsValidation.push({ type: 'Type is required' });
  }

  if (validator.isEmpty(assessmentStatus)) {
    errorsValidation.push({ assessmentStatus: 'Assessment status is required' });
  }

  if (validator.isEmpty(considerationStatus)) {
    errorsValidation.push({ considerationStatus: 'Consideration status is required' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Create validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
