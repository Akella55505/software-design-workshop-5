import { Request, Response, NextFunction } from 'express';

import { PersonDto } from '../../dtos/PersonDto';
import { PersonService } from '../../services/PersonService';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const personService = new PersonService();
  try {
    const person = await personService.destroy(req.params.id);
    res.customSuccess(200, 'Person successfully deleted.', new PersonDto(person));
  } catch (err) {
    return next(err);
  }
};
