import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import type { User } from "./User.ts";
import { User as UserEntity } from "./User.ts";

@Entity("user_setting")
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column({ 
    type: "tinyint",
    default: 0 
  })
  receiveNotifications: number;
}