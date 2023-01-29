import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Deposite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  depositeTypeId: number;

  @Column("varchar", { length: 50 })
  from: string;

  @Column("varchar", { length: 200 })
  comment: string;

  @Column()
  updated_on: Date;

  constructor(
    amount: number,
    depositeTypeId: number,
    from: string,
    comment: string,
    updated_on: Date
  ) {
    this.amount = amount;
    this.depositeTypeId = depositeTypeId;
    this.from = from;
    this.comment = comment;
    this.updated_on = updated_on;
  }
}
