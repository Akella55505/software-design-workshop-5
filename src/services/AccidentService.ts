import { getRepository } from 'typeorm';

import { Accident } from '../orm/entities/accidents/Accident';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class AccidentService {
  async show(id: string) {
    const accidentRepository = getRepository(Accident);
    try {
      const accident = await accidentRepository
        .createQueryBuilder('accident')
        .leftJoinAndSelect('accident.Персони', 'accidentPerson')
        .leftJoinAndSelect('accidentPerson.Персона', 'person')
        .leftJoinAndSelect('accident.Транспортні_засоби', 'accidentVehicle')
        .leftJoinAndSelect('accidentVehicle.Транспортний_засіб', 'vehicle')
        .select(['accident', 'accidentPerson', 'person', 'accidentVehicle', 'vehicle'])
        .where('accident.id = :id', { id: id })
        .getOne();

      if (!accident) {
        throw new CustomError(404, 'General', `Accident with id:${id} not found.`, ['User not found.']);
      }
      return accident;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async list() {
    const accidentRepository = getRepository(Accident);
    try {
      const accidents = await accidentRepository
        .createQueryBuilder('accident')
        .leftJoinAndSelect('accident.Персони', 'accidentPerson')
        .leftJoinAndSelect('accidentPerson.Персона', 'person')
        .leftJoinAndSelect('accident.Транспортні_засоби', 'accidentVehicle')
        .leftJoinAndSelect('accidentVehicle.Транспортний_засіб', 'vehicle')
        .select(['accident', 'accidentPerson', 'person', 'accidentVehicle', 'vehicle'])
        .getMany();
      // const accidents = await accidentRepository.find({
      //   select: ['id', 'Дата', 'Медіа', 'Місце', 'Причини', 'Статус_оцінки', 'Статус_розгляду', 'Тип', 'Час'],
      //   relations: [
      //     'Судове_рішення',
      //     'Адмін_постанови',
      //     'Персони',
      //     'Персони.Персона',
      //     'Транспортні_засоби',
      //     'Транспортні_засоби.Транспортний_засіб',
      //   ],
      // });
      return accidents;
    } catch (err) {
      throw new CustomError(400, 'Raw', `Can't retrieve list of accidents.`, null, err);
    }
  }

  async edit(id: string, requestBody: any) {
    const { date, media, location, causes, assessmentStatus, considerationStatus, type, time } = requestBody;

    const accidentRepository = getRepository(Accident);
    try {
      const accident = await accidentRepository.findOne({ where: { id } });

      if (!accident) {
        throw new CustomError(404, 'General', `Accident with id:${id} not found.`, ['Accident not found.']);
      }

      accident.Дата = date;
      accident.Медіа = media;
      accident.Місце = location;
      accident.Причини = causes;
      accident.Статус_оцінки = assessmentStatus;
      accident.Статус_розгляду = considerationStatus;
      accident.Тип = type;
      accident.Час = time;

      try {
        await accidentRepository.save(accident);
        return accident;
      } catch (err) {
        throw new CustomError(409, 'Raw', `Accident can't be saved.`, null, err);
      }
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async destroy(id: string) {
    const accidentRepository = getRepository(Accident);
    try {
      const accident = await accidentRepository.findOne({ where: { id } });

      if (!accident) {
        throw new CustomError(404, 'General', 'Not Found', [`Accident with id:${id} doesn't exists.`]);
      }
      await accidentRepository.delete(id);

      return accident;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error deleting accident', null, err);
    }
  }

  async create(requestBody: any) {
    const { date, time, location, causes, type, media, assessmentStatus, considerationStatus } = requestBody;

    try {
      const accidentRepository = getRepository(Accident);

      const newAccident = accidentRepository.create({
        Дата: date,
        Час: time,
        Місце: location,
        Причини: causes,
        Тип: type,
        Медіа: media,
        Статус_оцінки: assessmentStatus,
        Статус_розгляду: considerationStatus,
      });

      await accidentRepository.save(newAccident);
      return newAccident;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error creating accident.', null, err);
    }
  }
}
