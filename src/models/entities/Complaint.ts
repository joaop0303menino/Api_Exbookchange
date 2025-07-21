import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, CreateDateColumn} from "typeorm";
import { TypeComplaint } from "./Type_complaint";
import type { User } from "./User";
import { User as UserEntity } from "./User";
import type { Profile } from "./Profile";
import { Profile as ProfileEntity } from "./Profile";

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
