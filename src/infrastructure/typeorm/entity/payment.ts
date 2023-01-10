import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    paied_on: Date

    @Column()
    amount: number

}
