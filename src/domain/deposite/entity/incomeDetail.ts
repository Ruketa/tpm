import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("income_details")
export class IncomeDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  income_id: number;

  @Column()
  message: string;

  @Column()
  updated_on: Date;
}
