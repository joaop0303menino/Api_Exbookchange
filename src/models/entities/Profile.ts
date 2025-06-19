import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Profile")
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    nickname: string;

    @Column({type: "text"})
    description: string;
    
    @Column({type: "blob"})
    photo: Buffer;
}; 