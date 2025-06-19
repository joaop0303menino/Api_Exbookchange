import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("author")
export class Author {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({type: "varchar"})
    full_name: string;
}