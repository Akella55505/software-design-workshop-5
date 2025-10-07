import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Accident } from '../accidents/Accident';
import { Person } from '../persons/Person';

import { AccidentRole } from './enums';

@Entity('tbl_ДТП_MM_Персона')
export class AccidentPerson {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => Accident, (a) => a.Персони, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ДТП_id' })
  ДТП: Accident;

  @ManyToOne(() => Person, (p) => p.Участь_в_ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Персона_id' })
  Персона: Person;

  @Column({ type: 'enum', enum: AccidentRole, enumName: 'accident_role' })
  Роль: AccidentRole;
}
