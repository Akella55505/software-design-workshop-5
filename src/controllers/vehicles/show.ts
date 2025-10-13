import { Request, Response, NextFunction } from 'express';

import { VehicleDto } from '../../dtos/VehicleDto';
import { VehicleService } from '../../services/VehicleService';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const vehicleService = new VehicleService();
  try {
    const vehicle = await vehicleService.show(req.params.id);
    res.customSuccess(200, 'Vehicle found', new VehicleDto(vehicle));
  } catch (err) {
    return next(err);
  }
};
