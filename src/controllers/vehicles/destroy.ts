import { Request, Response, NextFunction } from 'express';

import { VehicleDto } from '../../dtos/VehicleDto';
import { VehicleService } from '../../services/VehicleService';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const vehicleService = new VehicleService();
  try {
    const vehicle = await vehicleService.destroy(req.params.id);
    res.customSuccess(200, 'Vehicle successfully deleted.', new VehicleDto(vehicle));
  } catch (err) {
    return next(err);
  }
};
