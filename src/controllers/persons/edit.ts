import { Request, Response, NextFunction } from 'express';

import { PersonDto } from '../../dtos/PersonDto';
import { PersonService } from '../../services/PersonService';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const personService = new PersonService();
  try {
    const person = await personService.edit(req.params.id, req.body);
    res.customSuccess(200, 'Person successfully saved.', new PersonDto(person));
  } catch (err) {
    return next(err);
  }
};
