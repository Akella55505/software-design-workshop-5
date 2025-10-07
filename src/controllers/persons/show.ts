import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Person } from 'orm/entities/persons/Person';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const personRepository = getRepository(Person);
  try {
    const person = await personRepository.findOne(id, {
      select: ['id', 'Імʼя', 'Прізвище', 'По_батькові'],
      relations: [
        'Транспортні_засоби',
        'Страхові_виплати',
        'Медичні_висновки',
        'Адмін_постанови',
        'Участь_в_ДТП',
        'Участь_в_ДТП.ДТП',
      ],
    });

    if (!person) {
      const customError = new CustomError(404, 'General', `Person with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Person found', person);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
