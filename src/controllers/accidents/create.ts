import { Request, Response, NextFunction } from 'express';

import { AccidentDto } from '../../dtos/AccidentDto';
import { AccidentService } from '../../services/AccidentService';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const accidentService = new AccidentService();
  try {
    const accident = await accidentService.create(req.body);
    res.customSuccess(201, 'Accident successfully created.', new AccidentDto(accident));
  } catch (err) {
    return next(err);
  }
};
