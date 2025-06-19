import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Review")
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int"})
    ratting: number;

}; 