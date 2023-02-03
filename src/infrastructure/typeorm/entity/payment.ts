import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paied_on: Date;

  @Column()
  amount: number;

  @Column()
  purchased_item: string;

  @Column()
  quantity: number;

  constructor(
    paied_on: Date,
    amount: number,
    purchased_item: string,
    quantity: number
  ) {
    this.paied_on = paied_on;
    this.amount = amount;
    this.purchased_item = purchased_item;
    this.quantity = quantity;
  }
}
