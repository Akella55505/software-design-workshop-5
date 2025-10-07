import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { MedicalReport } from './MedicalReport';

@Entity('Медик')
export class Medic {
  @PrimaryColumn({ name: 'Номер_ліцензії', type: 'bigint' })
  Номер_ліцензії: number;

  @Column()
  Імʼя: string;

  @Column()
  Прізвище: string;

  @Column()
  По_батькові: string;

  @OneToMany(() => MedicalReport, (mr) => mr.Медик, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Медичні_висновки: MedicalReport[];
}
