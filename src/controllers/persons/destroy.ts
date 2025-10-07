import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Person } from 'orm/entities/persons/Person';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const personRepository = getRepository(Person);
  try {
    const person = await personRepository.findOne({ where: { id } });

    if (!person) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Person with id:${id} doesn't exists.`]);
      return next(customError);
    }
    await personRepository.delete(id);

    res.customSuccess(200, 'Person successfully deleted.', {
      id: person.id,
      name: person.Імʼя,
      surname: person.Прізвище,
      patronymic: person.По_батькові,
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
