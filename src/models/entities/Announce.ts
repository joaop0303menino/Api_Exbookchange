import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import type { User } from "./User.ts";
import { User as UserEntity } from "./User.ts";
import type { Author } from "./Author.ts";
import { Author as AuthorEntity } from "./Author.ts";
import type { ConservationStatus } from "./Conservation_status.ts";
import { ConservationStatus as ConservationStatusEntity } from "./Conservation_status.ts";
import { ImagesBook } from "./Images_book.ts";
import { ExchangeDonation } from "./ExchangeDonation.ts";

export enum ExchangeDonationStatusEnum {
  Exchange = 'Exchange',
  Donation = 'Donation'
};

@Entity("announce")
export class Announce {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConservationStatusEntity)
  @JoinColumn({ name: "id_conservation_status" })
  conservationStatus: ConservationStatus;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => AuthorEntity)
  @JoinColumn({ name: "id_author" })
  author: Author;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: ExchangeDonationStatusEnum,
    default: ExchangeDonationStatusEnum.Exchange
  })
  is_exchange_donation: string

  @Column({ 
    type: "tinyint",
    default: 0,
  })
  archived: number;

  @Column({ type: "datetime" })
  posted_at: Date;

  @OneToMany(() => ImagesBook, img => img.announce)
  images: ImagesBook[];

  @OneToOne(() => ExchangeDonation, ed => ed.announce)
  exchangeDonations: ExchangeDonation[];
}
