import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import type { TypeNotification } from "./Type_notification.ts";
import { TypeNotification as TypeNotificationEntity } from "./Type_notification.ts";
import type { User } from "./User.ts";
import { User as UserEntity } from "./User.ts";
import type { Profile } from "./Profile.ts";
import { Profile as ProfileEntity } from "./Profile.ts";

@Entity("Notification")
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity) 
  @JoinColumn({ name: "id_profile" })
  profile: Profile;

  @ManyToOne(() => UserEntity) 
  @JoinColumn({ name: "id_user" })
  User: User;

  @OneToOne(() => TypeNotificationEntity)
  @JoinColumn({name: "id_typeNotification"})
  TypeNotification: TypeNotification

  @Column({ type: "text" })
  description: string;
}
