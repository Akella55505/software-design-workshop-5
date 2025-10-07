import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Vehicle } from 'orm/entities/vehicles/Vehicle';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const vehicleRepository = getRepository(Vehicle);
  try {
    const vehicles = await vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.Персона', 'person')
      .leftJoinAndSelect('vehicle.Страхові_оцінки', 'insurance')
      .leftJoinAndSelect('vehicle.Участь_в_ДТП', 'participation')
      .leftJoinAndSelect('participation.ДТП', 'accident')
      .select([
        'vehicle.id',
        'vehicle.VIN_код',
        'vehicle.Марка',
        'vehicle.Модель',
        'vehicle.Номерний_знак',
        'person.id',
        'person.Імʼя',
        'person.Прізвище',
        'person.По_батькові',
        'insurance',
        'accident',
      ])
      .getMany();
    // const vehicles = await vehicleRepository.find({
    //   select: ['id', 'VIN_код', 'Марка', 'Модель', 'Номерний_знак'],
    //   relations: [
    //     'Персона',
    //     'Персона.id',
    //     'Персона.Імʼя',
    //     'Персона.Прізвище',
    //     'Персона.По_батькові',
    //     'Страхові_оцінки',
    //     'Участь_в_ДТП',
    //     'Участь_в_ДТП.ДТП',
    //   ],
    // });
    res.customSuccess(200, 'List of vehicles.', vehicles);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of vehicles.`, null, err);
    return next(customError);
  }
};
