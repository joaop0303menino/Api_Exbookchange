import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Profile } from "./Profile";
import { Profile as ProfileEntity } from "./Profile";

@Entity("review")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity) 
  @JoinColumn({ name: "id_profile" })
  profile: Profile;

  @Column({ type: "int" })
  rating: number;
}
