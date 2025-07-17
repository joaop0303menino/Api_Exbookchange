import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import type { Complaint } from "./Complaint.ts";
import { Complaint as ComplaintEntity} from "./Complaint.ts";

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
