import { Request, Response, NextFunction } from 'express';

import { PersonDto } from '../../dtos/PersonDto';
import { PersonService } from '../../services/PersonService';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const personService = new PersonService();
  try {
    const persons = await personService.list();
    res.customSuccess(
      200,
      'List of persons.',
      persons.map((person) => new PersonDto(person)),
    );
  } catch (err) {
    return next(err);
  }
};
