import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Person } from 'orm/entities/persons/Person';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { passportData, firstName, lastName, patronymic, driverLicense } = req.body;

  const personRepository = getRepository(Person);

  try {
    const existingPerson = await personRepository.findOne({ where: { Паспортні_дані: passportData } });
    if (existingPerson) {
      const customError = new CustomError(409, 'General', `Person with passport data ${passportData} already exists.`, [
        'Person already exists.',
      ]);
      return next(customError);
    }

    const newPerson = personRepository.create({
      Паспортні_дані: passportData,
      Імʼя: firstName,
      Прізвище: lastName,
      По_батькові: patronymic,
      Посвідчення_водія: driverLicense ?? null,
    });

    try {
      await personRepository.save(newPerson);

      res.customSuccess(201, 'Person successfully created.', {
        id: newPerson.id,
        passportData: newPerson.Паспортні_дані,
        firstName: newPerson.Імʼя,
        lastName: newPerson.Прізвище,
        patronymic: newPerson.По_батькові,
        driverLicense: newPerson.Посвідчення_водія,
      });
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Person can't be created.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error creating person.', null, err);
    return next(customError);
  }
};
