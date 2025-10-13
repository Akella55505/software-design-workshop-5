import { getRepository } from 'typeorm';

import { Person } from '../orm/entities/persons/Person';
import { Vehicle } from '../orm/entities/vehicles/Vehicle';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class VehicleService {
  async show(id: string) {
    const vehicleRepository = getRepository(Vehicle);
    try {
      const vehicle = await vehicleRepository
        .createQueryBuilder('vehicle')
        .leftJoinAndSelect('vehicle.Персона', 'person')
        .select(['vehicle', 'person'])
        .where('vehicle.id = :id', { id: id })
        .getOne();
      // const vehicle = await vehicleRepository.findOne(id, {
      //   select: ['id', 'username', 'name', 'email', 'role', 'language', 'created_at', 'updated_at'],
      // });

      if (!vehicle) {
        throw new CustomError(404, 'General', `Vehicle with id:${id} not found.`, ['User not found.']);
      }
      return vehicle;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async list() {
    const vehicleRepository = getRepository(Vehicle);
    try {
      const vehicles = await vehicleRepository
        .createQueryBuilder('vehicle')
        .leftJoinAndSelect('vehicle.Персона', 'person')
        .select(['vehicle', 'person'])
        .getMany();
      // const vehicles = await vehicleRepository.find({
      //   select: ['id', 'VIN_код', 'Марка', 'Модель', 'Номерний_знак'],
      //   relations: [
      //     'Персона',
      //     'Персона.id',
      //     'Персона.Імʼя',
      //     'Персона.Прізвище',
      //     'Персона.По_батькові',
      //     'Страхові_оцінки',
      //     'Участь_в_ДТП',
      //     'Участь_в_ДТП.ДТП',
      //   ],
      // });
      return vehicles;
    } catch (err) {
      throw new CustomError(400, 'Raw', `Can't retrieve list of vehicles.`, null, err);
    }
  }

  async edit(id: string, requestBody: any) {
    const { vin, make, model, licensePlate } = requestBody;

    const vehicleRepository = getRepository(Vehicle);
    try {
      const vehicle = await vehicleRepository.findOne({ where: { id } });

      if (!vehicle) {
        throw new CustomError(404, 'General', `Vehicle with id:${id} not found.`, ['Vehicle not found.']);
      }

      vehicle.VIN_код = vin;
      vehicle.Марка = make;
      vehicle.Модель = model;
      vehicle.Номерний_знак = licensePlate;

      try {
        await vehicleRepository.save(vehicle);
        return vehicle;
      } catch (err) {
        throw new CustomError(409, 'Raw', `Vehicle can't be saved.`, null, err);
      }
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async destroy(id: string) {
    const vehicleRepository = getRepository(Vehicle);
    try {
      const vehicle = await vehicleRepository.findOne({ where: { id } });

      if (!vehicle) {
        throw new CustomError(404, 'General', 'Not Found', [`Vehicle with id:${id} doesn't exists.`]);
      }
      await vehicleRepository.delete(id);

      return vehicle;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async create(requestBody: any) {
    const { vin, make, model, licensePlate, personId } = requestBody;

    const vehicleRepository = getRepository(Vehicle);
    const personRepository = getRepository(Person);

    try {
      const existingVehicle = await vehicleRepository.findOne({ where: { VIN_код: vin } });
      if (existingVehicle) {
        throw new CustomError(409, 'General', `Vehicle with VIN ${vin} already exists.`, ['Vehicle already exists.']);
      }

      let person: Person | undefined;
      if (personId) {
        person = await personRepository.findOne({ where: { id: personId } });
        if (!person) {
          throw new CustomError(404, 'General', `Person with id:${personId} not found.`, ['Person not found.']);
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

        return newVehicle;
      } catch (err) {
        throw new CustomError(409, 'Raw', `Vehicle can't be created.`, null, err);
      }
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error creating vehicle.', null, err);
    }
  }
}
