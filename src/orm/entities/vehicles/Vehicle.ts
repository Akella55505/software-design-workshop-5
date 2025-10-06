import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { InsuranceEvaluation } from '../insurance/InsuranceEvaluation';
import { AccidentVehicle } from '../MM/AccidentVehicle';
import { Person } from '../persons/Person';

@Entity('Транспортний_засіб')
export class Vehicle {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ length: 17 })
  VIN_код: string;

  @Column({ length: 20 })
  Марка: string;

  @Column({ length: 20 })
  Модель: string;

  @Column({ length: 8 })
  Номерний_знак: string;

  @ManyToOne(() => Person, (p) => p.Транспортні_засоби)
  Персона: Person;

  @OneToMany(() => AccidentVehicle, (av) => av.Транспортний_засіб)
  Участь_в_ДТП: AccidentVehicle[];

  @OneToMany(() => InsuranceEvaluation, (ie) => ie.Транспортний_засіб)
  Страхові_оцінки: InsuranceEvaluation[];
}
