import { Request, Response, NextFunction } from 'express';

import { VehicleDto } from '../../dtos/VehicleDto';
import { VehicleService } from '../../services/VehicleService';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const vehicleService = new VehicleService();
  try {
    const vehicle = await vehicleService.create(req.body);
    res.customSuccess(201, 'Vehicle successfully created.', new VehicleDto(vehicle));
  } catch (err) {
    return next(err);
  }
};
