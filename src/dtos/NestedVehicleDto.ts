import { AccidentVehicle } from '../orm/entities/MM/AccidentVehicle';
import { Vehicle } from '../orm/entities/vehicles/Vehicle';

export class NestedVehicleDto {
  make: string;
  model: string;
  licensePlate: string;

  constructor(vehicle: Vehicle | AccidentVehicle) {
    if (vehicle instanceof Vehicle) {
      this.make = vehicle.Марка;
      this.model = vehicle.Модель;
      this.licensePlate = vehicle.Номерний_знак;
    } else {
      this.make = vehicle.Транспортний_засіб.Марка;
      this.model = vehicle.Транспортний_засіб.Модель;
      this.licensePlate = vehicle.Транспортний_засіб.Номерний_знак;
    }
  }
}
