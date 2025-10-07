import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

import { CourtDecision } from '../courtDecisions/CourtDecision';
import { InsuranceEvaluation } from '../insurance/InsuranceEvaluation';
import { MedicalReport } from '../medical/MedicalReport';
import { AccidentPerson } from '../MM/AccidentPerson';
import { AccidentVehicle } from '../MM/AccidentVehicle';
import { AdministrativeDecision } from '../police/AdministrativeDecision';

import { AssessmentStatus, ConsiderationStatus } from './enums';

// noinspection NonAsciiCharacters
@Entity('ДТП')
export class Accident {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ type: 'date' })
  Дата: Date;

  @Column({ type: 'jsonb', nullable: true })
  Медіа?: any;

  @Column({ type: 'text' })
  Місце: string;

  @Column({ type: 'text' })
  Причини: string;

  @Column({
    type: 'enum',
    enum: ConsiderationStatus,
    enumName: 'consideration_status',
    default: ConsiderationStatus.Registered,
  })
  Статус_оцінки: ConsiderationStatus;

  @Column({ type: 'enum', enum: AssessmentStatus, enumName: 'assessment_status', default: AssessmentStatus.InReview })
  Статус_розгляду: AssessmentStatus;

  @Column({ type: 'text' })
  Тип: string;

  @Column({ type: 'time without time zone' })
  Час: string;

  @OneToMany(() => AccidentPerson, (ap) => ap.ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Персони: AccidentPerson[];

  @OneToMany(() => AccidentVehicle, (av) => av.ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Транспортні_засоби: AccidentVehicle[];

  @OneToMany(() => InsuranceEvaluation, (ie) => ie.ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Страхові_оцінки: InsuranceEvaluation[];

  @OneToOne(() => CourtDecision, (cd) => cd.ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Судове_рішення: CourtDecision;

  @OneToMany(() => MedicalReport, (mr) => mr.ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Медичні_висновки: MedicalReport[];

  @OneToMany(() => AdministrativeDecision, (ad) => ad.ДТП, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Адмін_постанови: AdministrativeDecision[];
}
