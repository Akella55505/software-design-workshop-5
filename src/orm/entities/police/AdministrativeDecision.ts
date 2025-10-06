import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Accident } from '../accidents/Accident';
import { Person } from '../persons/Person';

import { Police } from './Police';

@Entity('Адміністративна_постанова')
export class AdministrativeDecision {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => Accident, (a) => a.Адмін_постанови)
  @JoinColumn({ name: 'ДТП_id' })
  ДТП: Accident;

  @ManyToOne(() => Person, (p) => p.Адмін_постанови)
  @JoinColumn({ name: 'Персона_id' })
  Персона: Person;

  @ManyToOne(() => Police, (p) => p.Постанови)
  @JoinColumn({ name: 'Поліцейський_id' })
  Поліцейський: Police;

  @Column({ type: 'text' })
  Постанова: string;
}
