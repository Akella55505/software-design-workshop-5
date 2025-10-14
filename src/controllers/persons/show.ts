import { Request, Response, NextFunction } from 'express';

import { PersonDto } from '../../dtos/PersonDto';
import { PersonService } from '../../services/PersonService';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const personService = new PersonService();
  try {
    const person = await personService.show(req.params.id);
    res.customSuccess(200, 'Person found', new PersonDto(person));
  } catch (err) {
    return next(err);
  }
};
