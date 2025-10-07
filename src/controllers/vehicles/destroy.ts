import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Vehicle } from 'orm/entities/vehicles/Vehicle';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const vehicleRepository = getRepository(Vehicle);
  try {
    const vehicle = await vehicleRepository.findOne({ where: { id } });

    if (!vehicle) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Vehicle with id:${id} doesn't exists.`]);
      return next(customError);
    }
    await vehicleRepository.delete(id);

    res.customSuccess(200, 'Vehicle successfully deleted.', {
      id: vehicle.id,
      vin: vehicle.VIN_код,
      licensePlate: vehicle.Номерний_знак,
      make: vehicle.Марка,
      model: vehicle.Модель,
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
