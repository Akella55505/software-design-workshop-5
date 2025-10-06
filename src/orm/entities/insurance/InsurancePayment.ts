import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Person } from '../persons/Person';

import { InsuranceEvaluation } from './InsuranceEvaluation';

@Entity('Страхова_виплата')
export class InsurancePayment {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => Person, (p) => p.Страхові_виплати)
  @JoinColumn({ name: 'Персона_id' })
  Персона: Person;

  @ManyToOne(() => InsuranceEvaluation, (ie) => ie.Виплати)
  @JoinColumn({ name: 'Страхова_оцінка_id' })
  Страхова_оцінка: InsuranceEvaluation;

  @Column({ type: 'bigint' })
  Сума: number;
}
