import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Announce")
export class Announce {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    title: string;

    @Column({type: "text"})
    description: string;
    
    @Column({type: "datetime"})
    posted_at: Date;
    
    @Column({type: "boolean"})
    isDelete: boolean;
};