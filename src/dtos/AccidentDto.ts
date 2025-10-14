import { Accident } from '../orm/entities/accidents/Accident';
import { AssessmentStatus, ConsiderationStatus } from '../orm/entities/accidents/enums';

import { NestedPersonDto } from './NestedPersonDto';
import { NestedVehicleDto } from './NestedVehicleDto';

export class AccidentDto {
  date: Date;
  media: string;
  location: string;
  causes: string;
  considerationStatus: ConsiderationStatus;
  assessmentStatus: AssessmentStatus;
  type: string;
  time: string;
  persons?: NestedPersonDto[];
  vehicles?: NestedVehicleDto[];

  constructor(accident: Accident) {
    this.location = accident.Місце;
    this.type = accident.Тип;
    this.time = accident.Час;
    this.date = accident.Дата;
    this.causes = accident.Причини;
    this.media = accident.Медіа;
    this.considerationStatus = accident.Статус_розгляду;
    this.assessmentStatus = accident.Статус_оцінки;
    this.persons = accident.Персони?.map((person) => new NestedPersonDto(person));
    this.vehicles = accident.Транспортні_засоби?.map((vehicle) => new NestedVehicleDto(vehicle));
  }
}
