import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Accident } from 'orm/entities/accidents/Accident';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const accidentRepository = getRepository(Accident);
  try {
    const accident = await accidentRepository.findOne({ where: { id } });

    if (!accident) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Accident with id:${id} doesn't exists.`]);
      return next(customError);
    }
    await accidentRepository.delete(id);

    res.customSuccess(200, 'Accident successfully deleted.', {
      id: accident.id,
      location: accident.Місце,
      type: accident.Тип,
      time: accident.Час,
      date: accident.Дата,
      causes: accident.Причини,
      media: accident.Медіа,
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
