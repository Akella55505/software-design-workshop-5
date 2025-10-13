import { Request, Response, NextFunction } from 'express';

import { AccidentDto } from '../../dtos/AccidentDto';
import { AccidentService } from '../../services/AccidentService';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const accidentService = new AccidentService();
  try {
    const accidents = await accidentService.list();
    res.customSuccess(
      200,
      'List of accidents.',
      accidents.map((accident) => new AccidentDto(accident)),
    );
  } catch (err) {
    return next(err);
  }
};
