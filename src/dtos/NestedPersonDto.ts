import { Person } from '../orm/entities/persons/Person';

export class NestedPersonDto {
  name: string;
  surname: string;
  patronymic: string;

  constructor(person: Person) {
    this.name = person.Імʼя;
    this.surname = person.Прізвище;
    this.patronymic = person.По_батькові;
  }
}
