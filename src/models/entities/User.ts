import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile";
import { UserSetting } from "./User_setting";
import { Announce } from "./Announce";
import { ExchangeDonation } from "./ExchangeDonation";
import { Notification } from "./Notification";
import { UserPreference } from "./UserPreference";
import { Complaint } from "./Complaint";

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

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: "tinyint",
    default: 0,
  })
  trust_seal: number;

  @Column({
    type: "tinyint",
    default: 0,
  })
  blocked_user: number;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => UserSetting, (setting) => setting.user)
  setting: UserSetting;

  @OneToMany(() => Announce, (announce) => announce.user)
  announces: Announce[];

  @OneToMany(() => ExchangeDonation, (ed) => ed.user)
  exchangeDonations: ExchangeDonation[];

  @OneToMany(() => Notification, (Notification) => Notification.User)
  Notifications: Notification[];

  @OneToMany(() => UserPreference, (up) => up.user)
  UserPreferences: UserPreference[];

  @OneToMany(() => Complaint, (Complaint) => Complaint.user)
  Complaints: Complaint[];
}
