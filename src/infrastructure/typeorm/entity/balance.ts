import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  updated_on: Date;

  constructor(amount: number, updated_on: Date) {
    this.amount = amount;
    this.updated_on = updated_on;
  }
}
