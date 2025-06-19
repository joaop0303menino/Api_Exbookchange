import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ExchangeDonation")
export class ExchangeDonation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    phone_user_receiver: string;
};