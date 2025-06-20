import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { ExchangeDonation } from "./ExchangeDonation.ts";
import { ExchangeDonation as ExchangeDonationEntity } from "./ExchangeDonation.ts";

@Entity("exchange_donation_historic")
export class ExchangeDonationHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ExchangeDonationEntity)
  @JoinColumn({ name: "id_exchange_donation" })
  exchangeDonation: ExchangeDonation;

  @Column({ type: "datetime" })
  date_transaction: Date;
}
