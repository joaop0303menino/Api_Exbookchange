import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";
import type { User } from "./User.ts";
import { User as UserEntity } from "./User.ts";
import type { Announce } from "./Announce.ts";
import { Announce as AnnounceEntity } from "./Announce.ts";
import { ExchangeDonationHistoric } from "./ExchangeDonationHistoric.ts";

@Entity("exchange_donation")
export class ExchangeDonation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => AnnounceEntity)
  @JoinColumn({ name: "id_announce" })
  announce: Announce;

  @Column({ type: "varchar"})
  phone_user_receiver: string;

  @OneToMany(() => ExchangeDonationHistoric, hist => hist.exchangeDonation)
  history: ExchangeDonationHistoric[];
}
