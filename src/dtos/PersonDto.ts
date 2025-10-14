import { Person } from '../orm/entities/persons/Person';

import { NestedVehicleDto } from './NestedVehicleDto';

export class PersonDto {
  name: string;
  surname: string;
  patronymic: string;
  vehicles?: NestedVehicleDto[];
  constructor(person: Person) {
    this.name = person.Імʼя;
    this.surname = person.Прізвище;
    this.patronymic = person.По_батькові;
    this.vehicles = person.Транспортні_засоби?.map((vehicle) => new NestedVehicleDto(vehicle));
  }
}
