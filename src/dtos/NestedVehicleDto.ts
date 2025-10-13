import { Vehicle } from '../orm/entities/vehicles/Vehicle';

export class NestedVehicleDto {
  make: string;
  model: string;
  licensePlate: string;

  constructor(vehicle: Vehicle) {
    this.make = vehicle.Марка;
    this.model = vehicle.Модель;
    this.licensePlate = vehicle.Номерний_знак;
  }
}
