import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Accident } from 'orm/entities/accidents/Accident';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const accidentRepository = getRepository(Accident);
  try {
    const accidents = await accidentRepository
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
        'person',
        'accidentVehicle',
        'vehicle',
        'courtDecision',
        'adminDecisions',
      ])
      .getMany();
    // const accidents = await accidentRepository.find({
    //   select: ['id', 'Дата', 'Медіа', 'Місце', 'Причини', 'Статус_оцінки', 'Статус_розгляду', 'Тип', 'Час'],
    //   relations: [
    //     'Судове_рішення',
    //     'Адмін_постанови',
    //     'Персони',
    //     'Персони.Персона',
    //     'Транспортні_засоби',
    //     'Транспортні_засоби.Транспортний_засіб',
    //   ],
    // });
    res.customSuccess(200, 'List of accidents.', accidents);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of accidents.`, null, err);
    return next(customError);
  }
};
