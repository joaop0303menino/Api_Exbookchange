import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("ExchangeDonationHistoric")
export class ExchangeDonationHistoric {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "timestamp"})
    date_transation: Timestamp;
};