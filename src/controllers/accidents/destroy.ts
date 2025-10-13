import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { AccidentDto } from '../../dtos/AccidentDto';
import { AccidentService } from '../../services/AccidentService';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const accidentService = new AccidentService();
  try {
    const accident = await accidentService.destroy(req.params.id);
    res.customSuccess(200, 'Accident successfully deleted.', new AccidentDto(accident));
  } catch (err) {
    return next(err);
  }
};
