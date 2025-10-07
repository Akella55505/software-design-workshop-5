import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { Accident } from '../../orm/entities/accidents/Accident';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const accidentRepository = getRepository(Accident);
  try {
    const accident = await accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.Персони', 'accidentPerson')
      .leftJoinAndSelect('accidentPerson.Персона', 'person')
      .leftJoinAndSelect('accident.Транспортні_засоби', 'accidentVehicle')
      .leftJoinAndSelect('accidentVehicle.Транспортний_засіб', 'vehicle')
      .leftJoinAndSelect('accident.Судове_рішення', 'courtDecision')
      .leftJoinAndSelect('accident.Адмін_постанови', 'adminDecisions')
      .select([
        'accident.id',
        'accident.Дата',
        'accident.Медіа',
        'accident.Місце',
        'accident.Причини',
        'accident.Статус_оцінки',
        'accident.Статус_розгляду',
        'accident.Тип',
        'accident.Час',
        'accidentPerson',
        'person.Імʼя',
        'person.Прізвище',
        'person.По_батькові',
        'accidentVehicle',
        'vehicle',
        'courtDecision',
        'adminDecisions',
      ])
      .where('accident.id = :id', { id: id })
      .getMany();

    if (!accident) {
      const customError = new CustomError(404, 'General', `Accident with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Accident found', accident);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
