import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { AdministrativeDecision } from './AdministrativeDecision';

@Entity('Поліцейський')
export class Police {
  @PrimaryColumn({ name: 'Номер_посвідчення', type: 'bigint' })
  Номер_посвідчення: number;

  @Column()
  Імʼя: string;

  @Column()
  Прізвище: string;

  @Column()
  По_батькові: string;

  @OneToMany(() => AdministrativeDecision, (ad) => ad.Поліцейський)
  Постанови: AdministrativeDecision[];
}
