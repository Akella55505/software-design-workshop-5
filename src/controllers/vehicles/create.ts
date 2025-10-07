import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Person } from 'orm/entities/persons/Person';
import { Vehicle } from 'orm/entities/vehicles/Vehicle';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { vin, make, model, licensePlate, personId } = req.body;

  const vehicleRepository = getRepository(Vehicle);
  const personRepository = getRepository(Person);

  try {
    const existingVehicle = await vehicleRepository.findOne({ where: { VIN_код: vin } });
    if (existingVehicle) {
      const customError = new CustomError(409, 'General', `Vehicle with VIN ${vin} already exists.`, [
        'Vehicle already exists.',
      ]);
      return next(customError);
    }

    let person: Person | undefined;
    if (personId) {
      person = await personRepository.findOne({ where: { id: personId } });
      if (!person) {
        const customError = new CustomError(404, 'General', `Person with id:${personId} not found.`, [
          'Person not found.',
        ]);
        return next(customError);
      }
    }

    const newVehicle = vehicleRepository.create({
      VIN_код: vin,
      Марка: make,
      Модель: model,
      Номерний_знак: licensePlate,
      Персона: person,
    });

    try {
      await vehicleRepository.save(newVehicle);

      res.customSuccess(201, 'Vehicle successfully created.', {
        id: newVehicle.id,
        vin: newVehicle.VIN_код,
        make: newVehicle.Марка,
        model: newVehicle.Модель,
        licensePlate: newVehicle.Номерний_знак,
        personId: newVehicle.Персона ? newVehicle.Персона.id : null,
      });
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Vehicle can't be created.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error creating vehicle.', null, err);
    return next(customError);
  }
};
