import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Announce } from "./Announce.ts";
import { Announce as AnnounceEntity } from "./Announce.ts";

@Entity("images_book")
export class ImagesBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AnnounceEntity)
  @JoinColumn({ name: "id_announce" })
  announce: Announce;

  @Column({ type: "blob" })
  image: Buffer;

  @Column({ 
    type: "tinyint",
    default: 0
  })
  isCover: number;
}
