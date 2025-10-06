import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Accident } from '../accidents/Accident';
import { Vehicle } from '../vehicles/Vehicle';

import { InsurancePayment } from './InsurancePayment';

@Entity('Страхова_оцінка')
export class InsuranceEvaluation {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  Висновок: string;

  @ManyToOne(() => Accident, (a) => a.Страхові_оцінки)
  @JoinColumn({ name: 'ДТП_id' })
  ДТП: Accident;

  @ManyToOne(() => Vehicle, (v) => v.Страхові_оцінки)
  @JoinColumn({ name: 'Транспортний_засіб_id' })
  Транспортний_засіб: Vehicle;

  @OneToMany(() => InsurancePayment, (ip) => ip.Страхова_оцінка)
  Виплати: InsurancePayment[];
}
