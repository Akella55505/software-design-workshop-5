import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Accident } from '../accidents/Accident';
import { Person } from '../persons/Person';

import { Medic } from './Medic';

@Entity('Медичний_висновок')
export class MedicalReport {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  Вирок: string;

  @ManyToOne(() => Accident, (a) => a.Медичні_висновки, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ДТП_id' })
  ДТП: Accident;

  @ManyToOne(() => Medic, (m) => m.Медичні_висновки, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Медик_id' })
  Медик: Medic;

  @ManyToOne(() => Person, (p) => p.Медичні_висновки, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Персона_id' })
  Персона: Person;
}
