import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    full_name: string;

    @Column({type: "date"})
    date_birth: Date;
    
    @Column({type: "varchar"})
    email: string;
    
    @Column({type: "varchar"})
    password: string;

    @Column({type: "datetime"})
    created_at: Date;
    
    @Column({type: "datetime"})
    updated_at: Date;
};