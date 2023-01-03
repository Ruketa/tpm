import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Balance{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    updated_on: Date

}