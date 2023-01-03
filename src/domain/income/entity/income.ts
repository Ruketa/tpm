import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Income {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    incomed_on: Date

    @Column()
    amount: number

}

