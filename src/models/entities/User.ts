import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { Profile } from "./Profile.ts";
import { UserSetting } from "./User_setting.ts";
import { Announce } from "./Announce.ts";
import { ExchangeDonation } from "./ExchangeDonation.ts";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  full_name: string;

  @Column({ type: "date" })
  date_birth: Date;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar"})
  password: string;

  @Column({ type: "varchar"})
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

  @OneToOne(() => UserSetting, setting => setting.user)
  setting: UserSetting;

  @OneToMany(() => Announce, announce => announce.user)
  announces: Announce[];

  @OneToMany(() => ExchangeDonation, ed => ed.user)
  exchangeDonations: ExchangeDonation[];
}
