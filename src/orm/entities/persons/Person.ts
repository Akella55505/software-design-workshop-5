import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { InsurancePayment } from '../insurance/InsurancePayment';
import { MedicalReport } from '../medical/MedicalReport';
import { AccidentPerson } from '../MM/AccidentPerson';
import { AdministrativeDecision } from '../police/AdministrativeDecision';
import { Vehicle } from '../vehicles/Vehicle';

@Entity('Персона')
export class Person {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ type: 'jsonb' })
  Паспортні_дані: any;

  @Column()
  Імʼя: string;

  @Column()
  Прізвище: string;

  @Column()
  По_батькові: string;

  @Column({ type: 'jsonb', nullable: true })
  Посвідчення_водія?: any;

  @OneToMany(() => AccidentPerson, (ap) => ap.Персона, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Участь_в_ДТП: AccidentPerson[];

  @OneToMany(() => Vehicle, (v) => v.Персона, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Транспортні_засоби: Vehicle[];

  @OneToMany(() => InsurancePayment, (ip) => ip.Персона, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Страхові_виплати: InsurancePayment[];

  @OneToMany(() => MedicalReport, (mr) => mr.Персона, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Медичні_висновки: MedicalReport[];

  @OneToMany(() => AdministrativeDecision, (ad) => ad.Персона, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Адмін_постанови: AdministrativeDecision[];
}
