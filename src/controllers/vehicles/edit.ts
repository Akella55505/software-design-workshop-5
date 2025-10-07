import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Vehicle } from 'orm/entities/vehicles/Vehicle';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { vin, make, model, licensePlate } = req.body;

  const vehicleRepository = getRepository(Vehicle);
  try {
    const vehicle = await vehicleRepository.findOne({ where: { id } });

    if (!vehicle) {
      const customError = new CustomError(404, 'General', `Vehicle with id:${id} not found.`, ['Vehicle not found.']);
      return next(customError);
    }

    vehicle.VIN_код = vin;
    vehicle.Марка = make;
    vehicle.Модель = model;
    vehicle.Номерний_знак = licensePlate;

    try {
      await vehicleRepository.save(vehicle);
      res.customSuccess(200, 'Vehicle successfully saved.', {
        id: vehicle.id,
        vin: vehicle.VIN_код,
        licensePlate: vehicle.Номерний_знак,
        make: vehicle.Марка,
        model: vehicle.Модель,
      });
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Vehicle can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
