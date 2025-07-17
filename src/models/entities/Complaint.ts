import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, CreateDateColumn} from "typeorm";
import { TypeComplaint } from "./Type_complaint.ts";
import type { User } from "./User.ts";
import { User as UserEntity } from "./User.ts";
import type { Profile } from "./Profile.ts";
import { Profile as ProfileEntity } from "./Profile.ts";

@Entity("Complaint")
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity) 
  @JoinColumn({ name: "id_profile" })
  profile: Profile;

  @ManyToOne(() => UserEntity) 
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  date_complaint: Date;

  @OneToMany(() => TypeComplaint, TypeComplaint => TypeComplaint.Complaint) 
  TypeComplaints: TypeComplaint[];
  
}
