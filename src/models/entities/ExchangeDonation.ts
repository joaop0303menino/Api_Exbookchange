import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";
import type { User } from "./User";
import { User as UserEntity } from "./User";
import type { Announce } from "./Announce";
import { Announce as AnnounceEntity } from "./Announce";
import { ExchangeDonationHistoric } from "./ExchangeDonationHistoric";

@Entity("exchange_donation")
export class ExchangeDonation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_user" })
  user: User;

  @OneToOne(() => AnnounceEntity)
  @JoinColumn({ name: "id_announce" })
  announce: Announce;

  @Column({ type: "varchar"})
  user_receiver: string;

  @OneToOne(() => ExchangeDonationHistoric, hist => hist.exchangeDonation)
  history: ExchangeDonationHistoric[];
}
