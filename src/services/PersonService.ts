import { getRepository } from 'typeorm';

import { Person } from '../orm/entities/persons/Person';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class PersonService {
  async show(id: string) {
    const personRepository = getRepository(Person);
    try {
      const person = await personRepository.findOne(id, {
        select: ['id', 'Імʼя', 'Прізвище', 'По_батькові'],
        relations: ['Транспортні_засоби', 'Участь_в_ДТП', 'Участь_в_ДТП.ДТП'],
      });

      if (!person) {
        throw new CustomError(404, 'General', `Person with id:${id} not found.`, ['User not found.']);
      }
      return person;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async list() {
    const personRepository = getRepository(Person);
    try {
      const persons = await personRepository.find({
        select: ['id', 'Імʼя', 'Прізвище', 'По_батькові'],
        relations: ['Транспортні_засоби', 'Участь_в_ДТП', 'Участь_в_ДТП.ДТП'],
      });
      return persons;
    } catch (err) {
      throw new CustomError(400, 'Raw', `Can't retrieve list of persons.`, null, err);
    }
  }

  async edit(id: string, requestBody: any) {
    const { passportDetails, name, surname, patronymic, license } = requestBody;

    const personRepository = getRepository(Person);
    try {
      const person = await personRepository.findOne({ where: { id } });

      if (!person) {
        throw new CustomError(404, 'General', `Person with id:${id} not found.`, ['Person not found.']);
      }

      person.Паспортні_дані = passportDetails;
      person.Імʼя = name;
      person.Прізвище = surname;
      person.По_батькові = patronymic;
      person.Посвідчення_водія = license;

      try {
        await personRepository.save(person);
        return person;
      } catch (err) {
        throw new CustomError(409, 'Raw', `Person can't be saved.`, null, err);
      }
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async destroy(id: string) {
    const personRepository = getRepository(Person);
    try {
      const person = await personRepository.findOne({ where: { id } });

      if (!person) {
        throw new CustomError(404, 'General', 'Not Found', [`Person with id:${id} doesn't exists.`]);
      }
      await personRepository.delete(id);

      return person;
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error', null, err);
    }
  }

  async create(requestBody: any) {
    const { passportData, firstName, lastName, patronymic, driverLicense } = requestBody;

    const personRepository = getRepository(Person);

    try {
      const existingPerson = await personRepository.findOne({ where: { Паспортні_дані: passportData } });
      if (existingPerson) {
        throw new CustomError(409, 'General', `Person with passport data ${passportData} already exists.`, [
          'Person already exists.',
        ]);
      }

      const newPerson = personRepository.create({
        Паспортні_дані: passportData,
        Імʼя: firstName,
        Прізвище: lastName,
        По_батькові: patronymic,
        Посвідчення_водія: driverLicense ?? null,
      });

      try {
        await personRepository.save(newPerson);

        return newPerson;
      } catch (err) {
        throw new CustomError(409, 'Raw', `Person can't be created.`, null, err);
      }
    } catch (err) {
      throw new CustomError(400, 'Raw', 'Error creating person.', null, err);
    }
  }
}
