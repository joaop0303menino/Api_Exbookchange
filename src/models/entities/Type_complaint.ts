import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import type { Complaint } from "./Complaint";
import { Complaint as ComplaintEntity} from "./Complaint";

@Entity("Type_complaint")
export class TypeComplaint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ComplaintEntity)
  @JoinColumn({ name: "id_complaint" })
  Complaint: Complaint;

  @Column({ type: "varchar" })
  name: string;

}
