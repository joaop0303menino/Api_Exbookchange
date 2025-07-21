import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Announce } from "./Announce";
import { UserPreference } from "./User_preference";

@Entity("author")
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar"})
  full_name: string;

  @OneToMany(() => Announce, announce => announce.author)
  announces: Announce[];

  @OneToMany(() => UserPreference, UserPreference => UserPreference.author)
  UserPreferences: UserPreference[];
}