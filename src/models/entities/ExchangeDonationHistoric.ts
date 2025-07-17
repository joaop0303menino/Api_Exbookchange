import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import type { ExchangeDonation } from "./ExchangeDonation.ts";
import { ExchangeDonation as ExchangeDonationEntity } from "./ExchangeDonation.ts";

@Entity("exchange_donation_historic")
export class ExchangeDonationHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ExchangeDonationEntity)
  @JoinColumn({ name: "id_exchange_donation" })
  exchangeDonation: ExchangeDonation;

  @CreateDateColumn()
  date_transaction: Date;
}
