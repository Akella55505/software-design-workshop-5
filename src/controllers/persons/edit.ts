import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Person } from 'orm/entities/persons/Person';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { passportDetails, name, surname, patronymic, license } = req.body;

  const personRepository = getRepository(Person);
  try {
    const person = await personRepository.findOne({ where: { id } });

    if (!person) {
      const customError = new CustomError(404, 'General', `Person with id:${id} not found.`, ['Person not found.']);
      return next(customError);
    }

    person.Паспортні_дані = passportDetails;
    person.Імʼя = name;
    person.Прізвище = surname;
    person.По_батькові = patronymic;
    person.Посвідчення_водія = license;

    try {
      await personRepository.save(person);
      res.customSuccess(200, 'Person successfully saved.', {
        id: person.id,
        name: person.Імʼя,
        surname: person.Прізвище,
        patronymic: person.По_батькові,
      });
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Person can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
