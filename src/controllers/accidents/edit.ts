import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Accident } from 'orm/entities/accidents/Accident';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { date, media, location, causes, assessmentStatus, considerationStatus, type, time } = req.body;

  const accidentRepository = getRepository(Accident);
  try {
    const accident = await accidentRepository.findOne({ where: { id } });

    if (!accident) {
      const customError = new CustomError(404, 'General', `Accident with id:${id} not found.`, ['Accident not found.']);
      return next(customError);
    }

    accident.Дата = date;
    accident.Медіа = media;
    accident.Місце = location;
    accident.Причини = causes;
    accident.Статус_оцінки = assessmentStatus;
    accident.Статус_розгляду = considerationStatus;
    accident.Тип = type;
    accident.Час = time;

    try {
      await accidentRepository.save(accident);
      res.customSuccess(200, 'Accident successfully saved.', {
        id: accident.id,
        location: accident.Місце,
        type: accident.Тип,
        time: accident.Час,
        date: accident.Дата,
        causes: accident.Причини,
        media: accident.Медіа,
        assessmentStatus: accident.Статус_оцінки,
        considerationStatus: accident.Статус_розгляду,
      });
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Accident can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
