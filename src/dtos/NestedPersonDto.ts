import { AccidentPerson } from '../orm/entities/MM/AccidentPerson';
import { AccidentRole } from '../orm/entities/MM/enums';
import { Person } from '../orm/entities/persons/Person';

export class NestedPersonDto {
  name: string;
  surname: string;
  patronymic: string;
  role: AccidentRole;

  constructor(person: Person | AccidentPerson) {
    if (person instanceof Person) {
      this.name = person.Імʼя;
      this.surname = person.Прізвище;
      this.patronymic = person.По_батькові;
    } else {
      this.name = person.Персона.Імʼя;
      this.surname = person.Персона.Прізвище;
      this.patronymic = person.Персона.По_батькові;
      this.role = person.Роль;
    }
  }
}
