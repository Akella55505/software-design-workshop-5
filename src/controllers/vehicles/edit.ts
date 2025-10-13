import { Request, Response, NextFunction } from 'express';

import { VehicleDto } from '../../dtos/VehicleDto';
import { VehicleService } from '../../services/VehicleService';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const vehicleService = new VehicleService();
  try {
    const vehicle = await vehicleService.edit(req.params.id, req.body);
    res.customSuccess(200, 'Vehicle successfully saved.', new VehicleDto(vehicle));
  } catch (err) {
    return next(err);
  }
};
