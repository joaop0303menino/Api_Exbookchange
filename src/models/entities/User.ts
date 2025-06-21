import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    full_name: string;

    @Column({type: "date"})
    date_birth: Date;
    
    @Column({type: "varchar", unique: true})
    email: string;
    
    @Column({type: "varchar"})
    password: string;
    
    @Column({ type: "varchar", nullable: true})
    phone?: string;

    @CreateDateColumn({type: "datetime"})
    created_at: Date;
    
    @UpdateDateColumn({type: "datetime"})
    updated_at: Date;
};