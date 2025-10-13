import { Request, Response, NextFunction } from 'express';

import { VehicleDto } from '../../dtos/VehicleDto';
import { VehicleService } from '../../services/VehicleService';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const vehicleService = new VehicleService();
  try {
    const vehicles = await vehicleService.list();
    res.customSuccess(
      200,
      'List of vehicles.',
      vehicles.map((vehicle) => new VehicleDto(vehicle)),
    );
  } catch (err) {
    return next(err);
  }
};
