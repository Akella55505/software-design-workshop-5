import { Vehicle } from '../orm/entities/vehicles/Vehicle';

import { NestedPersonDto } from './NestedPersonDto';

export class VehicleDto {
  id: number;
  make: string;
  model: string;
  licensePlate: string;
  owner?: NestedPersonDto;

  constructor(vehicle: Vehicle) {
    this.id = vehicle.id;
    this.make = vehicle.Марка;
    this.model = vehicle.Модель;
    this.licensePlate = vehicle.Номерний_знак;
    if (vehicle.Персона) {
      this.owner = new NestedPersonDto(vehicle.Персона);
    }
  }
}
