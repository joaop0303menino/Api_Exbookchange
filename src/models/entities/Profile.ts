import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import type { User } from "./User.ts";
import { User as UserEntity } from "./User.ts";
import { Review } from "./Review.ts";
import { Notification } from "./Notification.ts";
import { Complaint } from "./Complaint.ts";

@Entity("profile")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column({ type: "varchar"})
  nickname: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "blob" })
  photo: Buffer;

  @OneToMany(() => Review, () => Review)
  reviews: Review[];

  @OneToMany(() => Notification, () => Notification)
  Notifications: Notification[];

  @OneToMany(() => Complaint, () => Complaint)
  Complaints: Complaint[];
}
