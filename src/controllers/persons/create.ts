import { Request, Response, NextFunction } from 'express';

import { PersonDto } from '../../dtos/PersonDto';
import { PersonService } from '../../services/PersonService';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const personService = new PersonService();
  try {
    const person = await personService.create(req.body);
    res.customSuccess(201, 'Person successfully created.', new PersonDto(person));
  } catch (err) {
    return next(err);
  }
};
