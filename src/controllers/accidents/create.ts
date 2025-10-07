import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Accident } from 'orm/entities/accidents/Accident';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { date, time, location, causes, type, media, assessmentStatus, considerationStatus } = req.body;

  const accidentRepository = getRepository(Accident);

  try {
    const newAccident = accidentRepository.create({
      Дата: date,
      Час: time,
      Місце: location,
      Причини: causes,
      Тип: type,
      Медіа: media,
      Статус_оцінки: assessmentStatus,
      Статус_розгляду: considerationStatus,
    });

    try {
      await accidentRepository.save(newAccident);

      res.customSuccess(201, 'Accident successfully created.', {
        id: newAccident.id,
        date: newAccident.Дата,
        time: newAccident.Час,
        place: newAccident.Місце,
        reasons: newAccident.Причини,
        type: newAccident.Тип,
        assessmentStatus: newAccident.Статус_оцінки,
        considerationStatus: newAccident.Статус_розгляду,
      });
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Accident can't be created.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error creating accident.', null, err);
    return next(customError);
  }
};
