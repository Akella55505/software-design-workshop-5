import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { Accident } from '../accidents/Accident';

@Entity('Судове_рішення')
export class CourtDecision {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @OneToOne(() => Accident, (a) => a.Судове_рішення, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ДТП_id' })
  ДТП: Accident;

  @Column({ type: 'text' })
  Рішення: string;
}
