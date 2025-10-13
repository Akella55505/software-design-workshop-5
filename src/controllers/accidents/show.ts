import { Request, Response, NextFunction } from 'express';

import { AccidentDto } from '../../dtos/AccidentDto';
import { AccidentService } from '../../services/AccidentService';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const accidentService = new AccidentService();
  try {
    const accident = await accidentService.show(req.params.id);
    res.customSuccess(200, 'Accident found', new AccidentDto(accident));
  } catch (err) {
    return next(err);
  }
};
