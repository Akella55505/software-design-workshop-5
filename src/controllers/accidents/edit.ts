import { Request, Response, NextFunction } from 'express';

import { AccidentDto } from '../../dtos/AccidentDto';
import { AccidentService } from '../../services/AccidentService';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const accidentService = new AccidentService();
  try {
    const accident = await accidentService.edit(req.params.id, req.body);
    res.customSuccess(200, 'Accident successfully saved.', new AccidentDto(accident));
  } catch (err) {
    return next(err);
  }
};
