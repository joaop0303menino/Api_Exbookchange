import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { Notification  } from "./Notification.ts";

@Entity("Type_notification")
export class TypeNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @OneToOne(() => Notification, () => Notification)
  notifications: Notification[];
  
}