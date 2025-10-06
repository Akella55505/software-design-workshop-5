import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Accident } from '../accidents/Accident';
import { Vehicle } from '../vehicles/Vehicle';

@Entity('tbl_ДТП_MM_Транспортний_засіб')
export class AccidentVehicle {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => Accident, (a) => a.Транспортні_засоби)
  @JoinColumn({ name: 'ДТП_id' })
  ДТП: Accident;

  @ManyToOne(() => Vehicle, (v) => v.Участь_в_ДТП)
  @JoinColumn({ name: 'Транспортний_засіб_id' })
  Транспортний_засіб: Vehicle;
}
