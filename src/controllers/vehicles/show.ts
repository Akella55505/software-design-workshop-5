import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Vehicle } from 'orm/entities/vehicles/Vehicle';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const vehicleRepository = getRepository(Vehicle);
  try {
    const vehicle = await vehicleRepository
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
      .where('vehicle.id = :id', { id: id })
      .getOne();
    // const vehicle = await vehicleRepository.findOne(id, {
    //   select: ['id', 'username', 'name', 'email', 'role', 'language', 'created_at', 'updated_at'],
    // });

    if (!vehicle) {
      const customError = new CustomError(404, 'General', `Vehicle with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Vehicle found', vehicle);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
