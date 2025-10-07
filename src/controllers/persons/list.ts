import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Person } from 'orm/entities/persons/Person';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const personRepository = getRepository(Person);
  try {
    const persons = await personRepository.find({
      select: ['id', 'Паспортні_дані', 'Імʼя', 'Прізвище', 'По_батькові', 'Посвідчення_водія'],
      relations: [
        'Транспортні_засоби',
        'Страхові_виплати',
        'Медичні_висновки',
        'Адмін_постанови',
        'Участь_в_ДТП',
        'Участь_в_ДТП.ДТП',
      ],
    });
    res.customSuccess(200, 'List of persons.', persons);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of persons.`, null, err);
    return next(customError);
  }
};
